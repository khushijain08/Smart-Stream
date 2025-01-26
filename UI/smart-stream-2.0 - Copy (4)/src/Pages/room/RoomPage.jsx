import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Base from "../../component/Base";
import './RoomPage.css';
import { getMeetingById } from "../../Service/meetService";
import { getUserByUserName } from "../../Service/User-service";  // Import the getUserByUserName function

const RoomPage = () => {
    const { roomId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userName, setUsername] = useState(null); // State to store the username
    const meetingContainer = useRef(null);

    // Get user from localStorage or another state management solution
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user) {
            // Fetch user details by username after the user logs in
            getUserByUserName(user.userName)
                .then((userData) => {
                    // Set the username state with the fetched username
                    setUsername(userData.userName);
                })
                .catch((error) => {
                    console.error("Failed to fetch user details:", error);
                    setError("Failed to fetch user details.");
                    setLoading(false);
                });
        } else {
            setUsername("guest"); // Default to guest if no user is logged in
        }
    }, [user]);

    useEffect(() => {
        if (userName) {
            // Proceed with the meeting if the username is available
            const loadMeeting = async () => {
                try {
                    const meetingData = await getMeetingById(roomId); // Get meeting details from backend
                    const appID = 607121312;
                    const serverSecret = "5317a50d13c21465a8d33fa5ac29db8b";
                    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                        appID, 
                        serverSecret, 
                        roomId, 
                        Date.now().toString(), 
                        userName // Use the dynamic username here
                    );

                    const zp = ZegoUIKitPrebuilt.create(kitToken);
                    zp.joinRoom({
                        container: meetingContainer.current,
                        scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
                    });
                    setLoading(false);
                } catch (error) {
                    setError("Oops! Something went wrong. Please try again.");
                    setLoading(false);
                }
            };

            loadMeeting();
        }
    }, [roomId, userName]); // Trigger when username is updated

    const handleRetry = () => {
        setError(null);
        setLoading(true);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    return (
        <Base>
            <div className="room-page">
                <h2 className="room-title">Meeting Code: {roomId}</h2>

                {loading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                        <p>Joining the meeting...</p>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                        <button onClick={handleRetry}>Retry</button>
                    </div>
                )}

                <div ref={meetingContainer} className="meeting-container"></div>
            </div>
        </Base>
    );
};

export default RoomPage;
