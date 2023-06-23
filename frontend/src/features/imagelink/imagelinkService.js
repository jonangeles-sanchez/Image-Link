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
const createImageLink = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.post(API_URL, data, config);
};

// get a specific imagelink

// update a specific imagelink
const updateImageLink = async (token, data, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.put(API_URL + id, data, config);
};

// delete a specific imagelink
const deleteImageLink = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(API_URL + id, config);
};

const imagelinkService = {
  getImageLinks,
  createImageLink,
  updateImageLink,
  deleteImageLink,
};

export default imagelinkService;
