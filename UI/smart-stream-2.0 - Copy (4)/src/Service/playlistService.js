import { myAxios, privateAxios } from "./Helper";

// Create Playlist
export const createPlaylist = (playlistData) => {
  return privateAxios
    .post("/playlists", playlistData) // POST to /api/playlists
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating playlist:", error);
      throw error;
    });
};

// Update Playlist
export const updatePlaylist = (id, playlistData) => {
  return privateAxios
    .put(`/playlists/${id}`, playlistData) // PUT to /api/playlists/{id}
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating playlist:", error);
      throw error;
    });
};

// Delete Playlist
export const deletePlaylist = (id) => {
  return privateAxios
    .delete(`/playlists/${id}`) // DELETE to /api/playlists/{id}
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting playlist:", error);
      throw error;
    });
};

// Get All Playlists
export const getAllPlaylists = () => {
  return myAxios
    .get("/playlists") // GET to /api/playlists
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching playlists:", error);
      throw error;
    });
};

// Search Playlists by Title
export const searchPlaylistsByTitle = (title) => {
  return myAxios
    .get(`/playlists/search/${title}`) // GET to /api/playlists/search/{title}
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error searching playlists:", error);
      throw error;
    });
};

// Search Playlists by Username
export const searchPlaylistsByUsername = (username) => {
  return myAxios
    .get(`/playlists/search/username/${username}`) // GET to /api/playlists/search/username/{username}
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error searching playlists by username:", error);
      throw error;
    });
};

// Get Playlist by ID
export const getPlaylistById = (id) => {
  return myAxios
    .get(`/playlists/${id}`) // GET to /api/playlists/{id}
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching playlist by ID:", error);
      throw error;
    });
};
