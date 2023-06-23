import axios from "axios";

const API_URL = "/api/code/";

// Create image code
const createImageLinkCode = async (data) => {
  const response = await axios.post(API_URL, data.imagelinkid);
  return response.data;
};

// Get image code
const getImageLinkCode = async (data) => {
  const response = await axios.get(API_URL, data.code);
  return response.data;
};

const imagecodeService = {
  createImageLinkCode,
  getImageLinkCode,
};

export default imagecodeService;
