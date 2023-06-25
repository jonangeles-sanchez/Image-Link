import axios from "axios";

const API_URL = "/api/code/";

// Create image code
const createImageLinkCode = async (data) => {
  console.log(data);
  const response = await axios.post(API_URL, data);
  return response.data;
};

// Get image code
const getImagelinkCode = async (data) => {
  console.log(data);
  const response = await axios.get(API_URL + data.code, data);
  return response.data;
};

const imagecodeService = {
  createImageLinkCode,
  getImagelinkCode,
};

export default imagecodeService;
