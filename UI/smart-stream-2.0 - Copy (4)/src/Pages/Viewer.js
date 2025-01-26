import React, { useRef, useEffect, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import Base from '../component/Base';

function randomID(len) {
    let result = '';
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
    len = len || 5;
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

function Viewer() {
    const { roomId } = useParams();
    const meetingRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initMeeting = async () => {
            const appID = 1337461982;
            const serverSecret = 'b09c4a30c8a7a43e722501264027fe7d';
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomId,
                randomID(5),
                randomID(5)
            );
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: meetingRef.current,
                sharedLinks: [
                    {
                        name: 'Copy Link',
                        url: `http://localhost:3000/room/${roomId}`,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.LiveStreaming,
                },
                showMyCameraToggleButton: false,
                showMyMicrophoneToggleButton: false,
                showScreenSharingButton: false,
                turnOnMicrophoneWhenJoining: false,
                turnOnCameraWhenJoining: false,
            });

            setLoading(false);
        };

        initMeeting();
    }, [roomId]);

    return (
      <Base>
        <div style={styles.container}>
            {loading && (
                <div style={styles.loadingOverlay}>
                    <div style={styles.spinner}></div>
                    <p style={styles.loadingText}>Initializing Meeting...</p>
                </div>
            )}
            <div ref={meetingRef} style={styles.meetingContainer}></div>
        </div>
        </Base>
    );
}

// Styles
const styles = {
    container: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #1044ab, #8e44ad)', // Same gradient as Live page
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 10s ease infinite', // Add animation for gradient
        overflow: 'hidden',
    },
    meetingContainer: {
        width: '100%',
        height: '100%',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '5px solid rgba(255, 255, 255, 0.3)',
        borderTop: '5px solid #fff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        marginTop: '15px',
        fontSize: '18px',
        color: '#fff',
        fontWeight: '500',
    },
};

// Global Animations (add to index.html or global CSS)
const globalStyles = `
@keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

export default Viewer;
