import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Base from '../component/Base';

function Live() {
    const [roomId, setRoomID] = useState('');
    const navigate = useNavigate();

    const generateRandomRoomID = () => {
        return Math.random().toString(36).substring(2, 10); // Generate an 8-character random string
    };

    const handleCreateRoom = () => {
        const newRoomID = generateRandomRoomID();
        setRoomID(newRoomID);
        navigate(`/liveroom/${newRoomID}`);
    };

    const handleJoinLive = () => {
        if (!roomId.trim()) {
            alert('Please enter a Room ID.');
            return;
        }
        navigate(`/viewerroom/${roomId}`);
    };

    return (
        <Base>
            <div style={styles.container}>
                <div style={styles.card}>
                    <h1 style={styles.title}>Welcome to Live Room</h1>
                    <p style={styles.subtitle}>
                    Enter a room to join or view live streams
                    </p>
                    <input
                        type="text"
                        placeholder="Enter Room Title"
                        value={roomId}
                        onChange={(e) => setRoomID(e.target.value)}
                        style={styles.input}
                    />
                    <div style={styles.buttonContainer}>
                        <button onClick={handleCreateRoom} style={styles.primaryButton}>
                            Go Live
                        </button>
                        <button onClick={handleJoinLive} style={styles.secondaryButton}>
                            Join Live
                        </button>
                    </div>
                </div>
            </div>
        </Base>
    );
}

// CSS-in-JS styles
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(45deg, #1a2a6c, #b4b8e1)',
        animation: 'gradientShift 10s ease infinite',
        padding: '20px',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '20px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
        padding: '40px 30px',
        width: '350px',
        textAlign: 'center',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333',
    },
    subtitle: {
        fontSize: '16px',
        marginBottom: '20px',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '20px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
    },
    primaryButton: {
        flex: 1,
        padding: '12px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#1044ab',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
    secondaryButton: {
        flex: 1,
        padding: '12px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#8e44ad',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
};

export default Live;
