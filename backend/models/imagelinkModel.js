const mongoose = require("mongoose");

const imagelinkSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please enter your user id"],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please enter your title"],
    },
    description: {
      type: String,
      required: [true, "Please enter your description"],
    },
    images: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ImageLink", imagelinkSchema);
