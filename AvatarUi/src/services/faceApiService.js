import axios from "axios";

const API_URL = import.meta.env.VITE_NDOEBACKEND_APP_API_URL; // Replace with your actual API endpoint

const faceApiService = {
  searchFace: async (imageData) => {
    const reqBody = {
      base64: imageData.replace("data:image/png;base64,", ""),
    };
    try {
      const response = await axios.post(`${API_URL}/face/search`, reqBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      // Handle errors, log them, or throw an exception
      console.error("Error in face detection:", error);
      throw error;
    }
  },

  enrollFace: async (imageData) => {
    const reqBody = {
      base64: imageData.replace("data:image/png;base64,", ""),
    };
    try {
      const response = await axios.post(`${API_URL}/face/enroll`, reqBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      // Handle errors, log them, or throw an exception
      console.error("Error in face enrollment:", error);
      throw error;
    }
  },

  enrollUser: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/user/enroll`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      // Handle errors, log them, or throw an exception
      console.error("Error in face enrollment:", error);
      throw error;
    }
  },
  getUserByIndexId: async (indexId) => {
    try {
      const response = await axios.get(`${API_URL}/user/byIndexId/${indexId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // debugger;
      return response.data;
    } catch (error) {
      console.error("Error in getting user data:", error);
      throw error;
    }
  },
};

export default faceApiService;
