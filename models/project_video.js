const mongoose = require("mongoose");


const projectVideoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  video: {
    type: String,
    required: true,
  },
  quality: {
    type: String,
    required: true,
    default: "high"
  },
  androidUrl: {
    type: String,
    default: "",
  },
  iosUrl: {
    type: String,
    default: "",
  },
  userId: {
    required: true,
    type: String,
  },
  status: { type: String, default: "processing" },
}, { timestamps: true });

const ProjectVideo = mongoose.model("ProjectVideo", projectVideoSchema);
module.exports = { ProjectVideo, projectVideoSchema };
