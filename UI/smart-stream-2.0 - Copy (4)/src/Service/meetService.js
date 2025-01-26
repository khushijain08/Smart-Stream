import { privateAxios } from './Helper'; // Import the privateAxios from helper

// API call to create a meeting room
export const createMeetingRoom = async (meetingData) => {
    try {
        const response = await privateAxios.post('/v1/meet/create', meetingData);  // Backend endpoint for creating a meeting
        return response.data;  // Return meeting room details (including meetCode)
    } catch (error) {
        console.error("Error creating meeting room:", error);
        throw error;  // Throw error to be caught in the component
    }
};



export const getMeetingById = async (meetId) => {
    try {
        const response = await privateAxios.get(`/v1/meet/${meetId}`);  // Backend endpoint to get a meeting by ID
        return response.data;  // Return meeting details
    } catch (error) {
        console.error("Error fetching meeting details:", error);
        throw error;  // Throw error to be caught in the component
    }
};

// API call to join a meeting
export const joinMeetingRoom = async (meetCode, username) => {
    try {
        const response = await privateAxios.post(`/v1/meet/join/${meetCode}`, { username });  // Backend endpoint to join meeting
        return response.data;  // Return meeting room details
    } catch (error) {
        console.error("Error joining meeting room:", error);
        throw error;  // Throw error to be caught in the component
    }
};