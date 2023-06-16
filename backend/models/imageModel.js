const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
  {
    name: String,
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Image", imageSchema);
