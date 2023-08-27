const mongoose = require("mongoose");


const projectSchema = mongoose.Schema({
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
  images: [
    {
      type: String,
      required: true,
    },
  ],
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

const Project = mongoose.model("Project", projectSchema);
module.exports = { Project, projectSchema };
