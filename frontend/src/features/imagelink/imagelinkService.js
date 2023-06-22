import axios from "axios";

const API_URL = "/api/imagelink/";

// Get all imagelinks
const getImageLinks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Create a new imagelink

// get a specific imagelink

// update a specific imagelink

// delete a specific imagelink

const imagelinkService = {
  getImageLinks,
};

export default imagelinkService;
