const express = require("express");
const userRouter = express.Router();
const { Project } = require("../models/project");
const user = require("../middlewares/user");
const admin = require("../middlewares/admin");



// Add project
userRouter.post("/api/add-project", user, async (req, res) => {
  try {
    const { userId, name, description, images, quality } = req.body;
    let project = new Project({
      userId,
      name,
      description,
      images,
      quality,
    });
    project = await project.save();
    res.json(project);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get all your projects
userRouter.get("/api/get-projects", user, async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Delete the projects
userRouter.delete("/api/delete-project", user, async (req, res) => {
  try {
    const { id } = req.body;
    let project = await Project.findByIdAndDelete(id);
    res.json(project);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


userRouter.put("/api/change-project-status/:id", admin, async (req, res) => {
  try {
    var project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    project = await project.save();
    res.json(project);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = userRouter;
