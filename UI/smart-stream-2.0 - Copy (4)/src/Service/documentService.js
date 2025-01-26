import { myAxios, privateAxios } from './Helper';  // Import your Axios instances

export const createDocument = (documentData) => {
    return privateAxios
      .post("/documents/create", documentData)  // POST to /api/documents/create
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error creating document:", error);
        throw error;
      });
  };

  // Get All Documents
export const getUserDocuments = () => {
    return myAxios
      .get("/documents/")  // Ensure this is correct based on your API path
      .then((response) => response.data)  // Returning the data in a structured way
      .catch((error) => {
        console.error("Error fetching documents:", error);
        throw error;
      });
  };

  
// Get Document by ID (Only for the Logged-in User)
export const getDocumentById = (id) => {
    return myAxios
      .get(`/documents/${id}`)  // GET to /api/documents/{id}
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching document by ID:", error);
        throw error;
      });
  };

  
// Delete Document by ID (Only for the Logged-in User)
export const deleteDocument = (id) => {
    return privateAxios
      .delete(`/documents/${id}`)  // DELETE to /api/documents/{id}
      .then(() => {
        console.log("Document deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
        throw error;
      });
  };
  