const express = require("express");
const router = express.Router();
const path = require("path");
const {
  createImageLink,
  getAllImageLinks,
  getSingleImageLink,
  updateSingleImageLink,
  deleteSingleImageLink,
  getImage,
  deleteImage,
} = require("../controllers/imagelinkController");
const { protect } = require("../middleware/auth");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/").get(protect, getAllImageLinks).post(protect, createImageLink);
router
  .route("/:imagelinkid")
  .get(getSingleImageLink)
  .put(protect, upload.array("photos"), updateSingleImageLink)
  .delete(protect, deleteSingleImageLink);
router
  .route("/:imagelinkid/:imageid")
  .get(protect, getImage)
  .delete(protect, deleteImage);

module.exports = router;
