const express = require("express");
const router = express.Router();
const {
  getImagelinkCode,
  createImagelinkCode,
} = require("../controllers/imagelinkCodeController");

router.get("/", getImagelinkCode);
router.post("/", createImagelinkCode);

module.exports = router;
