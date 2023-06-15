const asyncHandler = require("express-async-handler");

const ImageLink = require("../models/imagelinkModel");

// @desc    Create a new image link
// @route   POST /api/imagelinks
// @access  Private
const createImageLink = asyncHandler(async (req, res) => {
  const { user, title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  //   const newImageLink = `An image link was created with title ${title} and description ${description} by user ${user}. The images are ${images}`;
  const newImageLink = await ImageLink.create({
    user,
    title,
    description,
  });

  res.status(200).json(newImageLink);
});

// @desc    Get all image links
// @route   GET /api/imagelinks
// @access  Public
const getAllImageLinks = asyncHandler(async (req, res) => {
  // Get all imageLinks associated with the user
  const imageLinks = await ImageLink.find({ user: req.user.id });

  res.status(200).json(imageLinks);
});

// @desc    Get a single image link
// @route   GET /api/imagelinks/:id
// @access  Public
const getSingleImageLink = asyncHandler(async (req, res) => {
  const imageLink = await ImageLink.findById(req.params.id);

  if (imageLink) {
    res.status(200).json(imageLink);
  } else {
    res.status(404);
    throw new Error("Image link not found");
  }
});

// @desc    Update a single image link
// @route   PUT /api/imagelinks/:id
// @access  Private
const updateSingleImageLink = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const imageLink = await ImageLink.findById(req.params.imagelinkid);

  if (!imageLink) {
    res.status(404);
    throw new Error("Image link not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  if (imageLink.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedImageLink = await ImageLink.findByIdAndUpdate(
    req.params.imagelinkid,
    req.body,
    {
      new: true, // new: true returns the updated object
    }
  );

  res.status(200).json(updatedImageLink);
});

// @desc    Delete a single image link
// @route   DELETE /api/imagelinks/:id
// @access  Private
const deleteSingleImageLink = asyncHandler(async (req, res) => {
  const imageLink = await ImageLink.findById(req.params.imagelinkid);

  if (!imageLink) {
    res.status(404);
    throw new Error("Image link not found");
  }

  // Auth middleware adds req.user to the request
  // If req.user is not found, throw an error
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (imageLink.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await ImageLink.findByIdAndDelete(req.params.imagelinkid);

  //res.status(200).json({ id: req.params.id });
  res.status(200).json(`Image link ${req.params.imagelinkid} deleted`);
});

// @desc   Obtain an image from obtained by multer
// @route  POST /api/imagelinks/:imageid
// @access Private
const getImage = asyncHandler(async (req, res) => {
  // Get the image id from the request and find the image in the ImageLink collection
  const imageLink = await ImageLink.findById(req.params.imageid);

  // If the image is not found, throw an error
  if (!imageLink) {
    res.status(404);
    throw new Error("ImageLink not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  if (imageLink.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  // If the image is found, get the image from the Image collection
  const image = await Image.findById(imageLink.image);

  // If the image is not found, throw an error
  if (!image) {
    res.status(404);
    throw new Error("Image not found");
  }

  // If the image is found, send the image to the client
  res.status(200).json(image);
});

// @desc   delete an image
// @route  DELETE /api/imagelinks/:imageid
// @access Private
const deleteImage = asyncHandler(async (req, res) => {
  // Get the image id from the request and find the image in the ImageLink collection
  const imageLink = await ImageLink.findById(req.params.imageid);

  // If the image is not found, throw an error
  if (!imageLink) {
    res.status(404);
    throw new Error("ImageLink not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  if (imageLink.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  // If the image is found, get the image from the Image collection
  const image = await Image.findById(imageLink.image);

  // If the image is not found, throw an error
  if (!image) {
    res.status(404);
    throw new Error("Image not found");
  }

  // If the image is found, delete the image
  await image.remove();

  // Delete the image link
  await imageLink.remove();

  // Send the id of the deleted image to the client
  res.status(200).json({ id: req.params.imageid });
});

module.exports = {
  createImageLink,
  getAllImageLinks,
  getSingleImageLink,
  updateSingleImageLink,
  deleteSingleImageLink,
  getImage,
  deleteImage,
};
