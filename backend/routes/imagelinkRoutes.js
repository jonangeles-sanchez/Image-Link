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

router.route("/").get(getAllImageLinks).post(createImageLink);
router
  .route("/:imagelinkid")
  .get(getSingleImageLink)
  .put(updateSingleImageLink)
  .delete(deleteSingleImageLink);
router.route("/:imagelinkid/imageid").get(getImage).delete(deleteImage);

module.exports = router;
