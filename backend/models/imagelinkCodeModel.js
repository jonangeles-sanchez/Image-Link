const mongoose = require("mongoose");

const imagelinkCodeSchema = mongoose.Schema(
  {
    imagelinkid: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please enter your imagelink id"],
      ref: "Imagelink",
    },
    code: {
      type: String,
      required: [true, "Please enter your code"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ImagelinkCode", imagelinkCodeSchema);
