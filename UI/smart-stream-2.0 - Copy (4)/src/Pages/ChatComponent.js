import React, { useEffect, useState } from 'react';
import { initializeChat, loginUser, sendMessage } from '../Service/chatService';

const ChatComponent = () => {
    const [zim, setZim] = useState(null);
    const [message, setMessage] = useState('');
    const [roomID, setRoomID] = useState('demoRoom');

    useEffect(() => {
        const zimInstance = initializeChat();
        setZim(zimInstance);
        loginUser(zimInstance, 'user123', 'User 123');
    }, []);

    const handleSendMessage = () => {
        if (zim && message) {
            sendMessage(zim, roomID, message);
            setMessage('');
        }
    };

    return (
        <div>
            <h1>ZEGOCLOUD In-App Chat</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;