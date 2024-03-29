const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const ImagelinkCode = require("../models/imagelinkCodeModel");
var { nanoid } = require("nanoid");
var ID = nanoid();

// @desc    Get imagelink ID from code
// @route   GET /api/code/:code
// @access  Public
const getImagelinkCode = asyncHandler(async (req, res) => {
  //   const { imagelinkid } = req.body;

  //   const imagelinkCode = await ImagelinkCode.findOne({ imagelinkid });

  //   if (!imagelinkCode) {
  //     res.status(404);
  //     throw new Error("Imagelink code not found");
  //   }

  const code = req.params.code;
  console.log("Your code" + code);

  const imagelinkCode = await ImagelinkCode.findOne({ code });

  if (!imagelinkCode) {
    res.status(404);
    throw new Error("Imagelink code not found");
  }

  res.status(200).json(imagelinkCode.imagelinkid);
});

// @desc    Create a new imagelink code for a given imagelink(id)
// @route   POST /api/code/:imagelinkid
// @access  Public
const createImagelinkCode = asyncHandler(async (req, res) => {
  const { imagelinkid } = req.body;

  let shortCode;
  // While the code is not unique, generate a new code
  do {
    shortCode = nanoid(5);
  } while (await ImagelinkCode.findOne({ code: shortCode }));

  const exists = await ImagelinkCode.findOne({ imagelinkid });
  let imagelinkCode;

  if (exists) {
    exists.code = shortCode;
    await exists.save();
    imagelinkCode = exists;
  } else {
    await ImagelinkCode.create({
      imagelinkid,
      code: shortCode,
    });
    imagelinkCode = await ImagelinkCode.findOne({ imagelinkid });
  }

  res.status(201).json(imagelinkCode);
});

module.exports = { getImagelinkCode, createImagelinkCode };
