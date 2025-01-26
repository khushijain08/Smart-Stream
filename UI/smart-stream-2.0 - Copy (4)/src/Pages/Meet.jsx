import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMeetingRoom } from '../Service/meetService'; // Import meet service
import Base from '../component/Base';
import './Meet.css';

function Meet() {
    const [topicName, setTopicName] = useState(''); // State for topic name
    const [error, setError] = useState(''); // State for handling errors
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (!topicName.trim()) {
            setError('Topic name cannot be empty.');
            return;
        }
        setLoading(true); // Set loading to true when the form is submitted
        setError(''); // Clear any previous errors
        try {
            const response = await createMeetingRoom({ topicName }); // Call create meeting API
            if (response?.meetCode) {
                navigate(`/room/${response.meetCode}`); // Navigate to the meeting room
            } else {
                throw new Error('Invalid response from server.');
            }
        } catch (err) {
            console.error('Error creating meet:', err);
            setError(
                err?.response?.data?.message || 
                'An error occurred while creating the meeting. Please try again.'
            );
        } finally {
            setLoading(false); // Set loading to false after the request finishes (success or failure)
        }
    };

    const handleJoinMeet = () => {
        navigate('/join-meet'); // Navigate to join-meet page
    };

    return (
        <Base>
            <div className="meet-container">
                <h1 className="meet-title">Create or Join a Meeting</h1>
                <form onSubmit={handleFormSubmit} className="meet-form">
                    <div className="form-group">
                        <label htmlFor="topicName" className="form-label">
                            Topic Name
                        </label>
                        <input
                            id="topicName"
                            value={topicName}
                            onChange={(e) => setTopicName(e.target.value)}
                            type="text"
                            className="form-input"
                            placeholder="Enter Topic Name"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-create" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Meet'}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}

                <button onClick={handleJoinMeet} className="btn btn-join">
                    Join Meet
                </button>
            </div>
        </Base>
    );
}

export default Meet;
