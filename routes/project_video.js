const express = require("express");
const projectVideoRouter = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { ProjectVideo } = require("../models/project_video");
const user = require("../middlewares/user");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");



// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dzpn0qrcd',
  api_key: '429727354892827',
  api_secret: 'jnxRobXP6l03X__RvKaHxHK7i1s',
});

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Add project video
projectVideoRouter.post('/api/add-project-video', upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No video file uploaded.');
  }
  const buffer = req.file.buffer;
  try {
    // Upload the video to Cloudinary
    cloudinary.uploader.upload_stream({ resource_type: 'video' }, async (error, result) => {
      if (error) {
        console.error('Error uploading video to Cloudinary:', error);
        return res.status(500).send('Error uploading video to Cloudinary.');
      }
      // Respond with the Cloudinary response, which includes the video URL
      const newVideo = new ProjectVideo({
        name: req.body.name,
        description: req.body.description,
        quality: req.body.quality,
        userId: req.body.userId,
        videoUrl: result.secure_url,
      });
      await newVideo.save();
      // Respond with a success message
      return res.json({ message: 'Video uploaded and saved to the database.' });
    }).end(buffer);
  } catch (error) {
    console.error('Error uploading video to Cloudinary or saving to the database:', error);
    return res.status(500).json({ message: 'Error uploading video or saving to the database.' });
  }
});

// Get all your projects-video

projectVideoRouter.get("/api/get-projects-video", admin, async (req, res) => {
  try {
    const projects = await ProjectVideo.find({});
    res.json(projects);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get projects-video for me

projectVideoRouter.get("/api/projects-video/me", auth, async (req, res) => {
  try {
    const projects = await ProjectVideo.find({ userId: req.user });
    res.json(projects);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// Delete the projects

projectVideoRouter.delete("/api/delete-project-video", user, async (req, res) => {
  try {
    const { id } = req.body;
    let project = await ProjectVideo.findByIdAndDelete(id);
    res.json(project);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


projectVideoRouter.put("/api/change-project-video-status/:id", admin, async (req, res) => {
  try {
    var project = await ProjectVideo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    project = await ProjectVideo.save();
    res.json(project);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = projectVideoRouter;
