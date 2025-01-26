import { myAxios } from "./Helper";

// Signup function
export const signup = (user) => {
  return myAxios
    .post('/v1/auth/signup', user) // Updated API endpoint
    .then((response) => response.data)
    .catch((error) => {
      console.error("Signup failed", error);
      throw error; // Throw error to handle it in calling components
    });
};

// Login function
export const loginUser = (loginDetail) => {
  return myAxios
    .post('/v1/auth/signin', loginDetail)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Login failed:", error);
      throw error; // Allow handling in calling component
    });
};


// Get user by username
export const getUserByUserName = (userName) => {
  return myAxios
    .get(`/users/userName/${userName}`) // Assuming this is the correct endpoint
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to fetch user by username:", error);
      throw error; // Allow handling in calling component
    });
};
