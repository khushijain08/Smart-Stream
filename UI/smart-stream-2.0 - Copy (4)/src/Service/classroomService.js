import { privateAxios } from './Helper'; // Import the privateAxios from helper

// Create Classroom
export const createClassroom = async (classroomData) => {
  try {
    const response = await privateAxios.post(`/classrooms/create`, classroomData);
    return response.data;
  } catch (error) {
    console.error("Error creating classroom:", error);
    throw error;
  }
};

// Join Classroom
export const joinClassroom = async (classCode) => {
  try {
    const response = await privateAxios.post(`/classrooms/join/${classCode}`);
    return response.data;
  } catch (error) {
    console.error("Error joining classroom:", error);
    throw error;
  }
};

// Get All Classrooms
export const getAllClassrooms = async () => {
  try {
    const response = await privateAxios.get(`/classrooms/my-classrooms`);
    return response.data;
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    throw error;
  }
};

// Search Classrooms (General Search by Name or Subject)
export const searchClassrooms = async (searchQuery) => {
  try {
    let url = '';
    
    // If the search query contains a space, assume it's a subject search
    if (searchQuery.includes(" ")) {
      url = `/classrooms/search/subject/${searchQuery}`;
    } else {
      url = `/classrooms/search/${searchQuery}`;
    }
    
    const response = await privateAxios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error searching classrooms:", error);
    throw error;
  }
};
// Delete Classroom
export const deleteClassroom = async (classroomId) => {
    try {
      const response = await privateAxios.delete(`/classrooms/delete/${classroomId}`);
      return response.data;  // This will be void, so you can just return the response for confirmation.
    } catch (error) {
      console.error("Error deleting classroom:", error);
      throw error;
    }
  };
  
  export const getClassroomDetails = async (classCode) => {
    try {
      const response = await privateAxios.get(`/classrooms/by-code/${classCode}`);
      return response.data; // Returns classroom details (name, description, etc.)
    } catch (error) {
      console.error("Error fetching classroom details:", error);
      throw error; // Throw the error so it can be handled in the component
    }
  };
  export const uploadNote = async (formData) => {
    try {
      const response = await privateAxios.post('/notes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Required for sending files
        },
      });
  
      if (response.status === 200) {
        return response.data;  // Return the response with the uploaded note details
      } else {
        throw new Error('Failed to upload note');
      }
    } catch (error) {
      console.error('Error uploading note:', error.response ? error.response.data : error.message);
      throw error;  // Rethrow the error to be handled by the calling function
    }
  };

  export const getNotesByClassroomName = async (className) => {
    try {
      const response = await privateAxios.get(`/notes/classroom/name/${className}`);
      return response.data; // Returns the list of notes for that classroom
    } catch (error) {
      console.error("Error fetching notes for classroom:", error);
      throw error;
    }
  };

  export const downloadNoteByTitle = async (title) => {
    try {
      const response = await fetch(`/api/download/${title}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch the file');
      }
  
      // Return the file as a Blob (binary data)
      return await response.blob();
    } catch (err) {
      console.error('Error fetching note file:', err);
      throw err;
    }
  };
  

  