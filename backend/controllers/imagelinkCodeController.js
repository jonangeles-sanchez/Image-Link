const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const ImagelinkCode = require("../models/imagelinkCodeModel");
var { nanoid } = require("nanoid");
var ID = nanoid();

// @desc    Get imagelink code by slink
// @route   GET /api/code/:slink
// @access  Public
const getImagelinkCode = asyncHandler(async (req, res) => {
  //   const { imagelinkid } = req.body;

  //   const imagelinkCode = await ImagelinkCode.findOne({ imagelinkid });

  //   if (!imagelinkCode) {
  //     res.status(404);
  //     throw new Error("Imagelink code not found");
  //   }

  const { code } = req.body;

  const imagelinkCode = await ImagelinkCode.findOne({ code });

  if (!imagelinkCode) {
    res.status(404);
    throw new Error("Imagelink code not found");
  }

  res.status(200).json(imagelinkCode.imagelinkid);
});

// @desc    Create a new imagelink code
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
