const asyncHandler = require("express-async-handler");
const Image = require("../models/imageModel");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { uploadFile, getFileStream, deleteFile } = require("../middleware/s3");

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
  const { imagelinkid } = req.params;
  console.log("ID: ", imagelinkid);

  if (!mongoose.Types.ObjectId.isValid(imagelinkid)) {
    res.status(400);
    throw new Error("Invalid image link ID");
  }

  const imageLink = await ImageLink.findById(imagelinkid);

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

  console.log("req.body: ", req.body);
  console.log("req.files: ", req.files);
  console.log("req.params.imagelinkid: ", req.params.imagelinkid);

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

  const getS3Key = async (file) => {
    const data = await uploadFile(file, req.user.createdAt.getTime());
    console.log(data);
    return data;
  };

  const updatedImages = await Promise.all(
    req.files.map(async (file) => {
      const s3Key = await getS3Key(file);
      const saveImage = new Image({
        name: file.filename,
        img: {
          // data: fs.readFileSync(
          //   path.join(__dirname, "../public/uploads", file.filename)
          // ),
          data: s3Key.Key,
          contentType: file.mimetype,
        },
      });
      console.log("saveImage: ", saveImage);
      return await saveImage.save();
    })
  );

  const updatedImageLink = await ImageLink.findByIdAndUpdate(
    req.params.imagelinkid,
    {
      title: req.body.title || imageLink.title,
      description: req.body.description || imageLink.description,
      images: updatedImages,
    },
    { new: true }
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

  for (let i = 0; i < imageLink.images.length; i++) {
    await deleteFile(imageLink.images[i].img.data);
  }

  await ImageLink.findByIdAndDelete(req.params.imagelinkid);

  //res.status(200).json({ id: req.params.id });
  res.status(200).json(`Image link ${req.params.imagelinkid} deleted`);
});

// @desc   Obtain an image from obtained by multer
// @route  POST /api/:imagelinkid/:imageid
// @access Private
const getImage = asyncHandler(async (req, res) => {
  // Get the image id from the request and find the image in the ImageLink collection
  const imageLink = await ImageLink.findById(req.params.imagelinkid);

  // If the image is not found, throw an error
  if (!imageLink) {
    res.status(404);
    throw new Error("ImageLink not found");
  }

  /*
  // REMOVE AUTHENTICATION TO ALLOW SHARING OF IMAGES

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  

  if (imageLink.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }
*/
  // ImageLink holds an array of objects with the image id
  // Find the image in the imagelink array of objects that hold the image id and the image object

  // const image = await imageLink.images.find(
  //   (image) => image._id.toString() === req.params.imageid.toString()
  // );
  const image = await getFileStream(req.params.imageid);

  // If the image is not found, throw an error
  if (!image) {
    res.status(404);
    throw new Error("Image not found");
  }

  // If the image is found, send the image
  //res.status(200).json(image);
  console.log("image: ", image);
  //image.data.pipe(res);
  //image.write(res);
  //res.status(200).json(image);
  //return image;
  res.send(image);
});

// @desc   delete an image
// @route  DELETE /api/imagelinks/:imageid
// @access Private
const deleteImage = asyncHandler(async (req, res) => {
  // Get the imagelink id from the request
  const imageLink = await ImageLink.findById(req.params.imagelinkid);

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

  // Search for the image in the ImageLink connection that matches the image id
  console.log("Images:", imageLink.images);
  console.log("req.body.mongoImageId: ", req.body.mongoImageId);
  const image = await imageLink.images.find(
    (image) => image._id.toString() === req.body.mongoImageId.toString()
  );

  // If the image is not found, throw an error
  if (!image) {
    res.status(404);
    throw new Error("Image not found");
  }

  // If the image is found, delete the image
  // Remove the image from the ImageLink array of images
  // ImageLink document holds an array of images
  // The array of images holds an object with the image id and the image object
  const updatedImageLink = await ImageLink.findOneAndUpdate(
    { _id: req.params.imagelinkid },
    {
      $pull: {
        images: { _id: new mongoose.Types.ObjectId(req.body.mongoImageId) },
      },
    },
    { new: true }
  );

  // Delete the image from the database
  await deleteFile(req.params.imageid);

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
