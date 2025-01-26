import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinMeetingRoom } from "../Service/meetService"; // Import meet service
import Base from "../component/Base";
import './Meet.css';

const JoinMeetPage = () => {
    const [roomCode, setRoomCode] = useState(""); // State to store room code input
    const [loading, setLoading] = useState(false); // State for loading spinner
    const [error, setError] = useState(""); // State to store errors
    const navigate = useNavigate();

    const handleFormSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        try {
            const username = "sampleUser"; // Replace this with logic to get the logged-in username
            const response = await joinMeetingRoom(roomCode, username);
            navigate(`/room/${roomCode}`); // Navigate to the room using roomCode
        } catch (error) {
            console.error("Error joining meet:", error);
            setError("Failed to join meeting. Please check the room code.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Base>
            <div className="join-meet-page">
                <h2>Join a Meeting</h2>
                <p>Enter the Room Code to Join</p>
                <form onSubmit={handleFormSubmit} className="join-meet-form">
                    <div className="form-group">
                        <label htmlFor="roomCode">Room Code</label>
                        <input
                            id="roomCode"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                            type="text"
                            required
                            placeholder="Enter Room Code"
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Joining...' : 'Join Meet'}
                    </button>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </Base>
    );
};

export default JoinMeetPage;
