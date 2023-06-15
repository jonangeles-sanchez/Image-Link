const express = require("express");
const router = express.Router();
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

router.route("/").get(protect, getAllImageLinks).post(protect, createImageLink);
router
  .route("/:imagelinkid")
  .get(protect, getSingleImageLink)
  .put(protect, updateSingleImageLink)
  .delete(protect, deleteSingleImageLink);
router
  .route("/:imagelinkid/imageid")
  .get(protect, getImage)
  .delete(protect, deleteImage);

module.exports = router;
