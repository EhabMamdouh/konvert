// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');


// IMPORTS FROM OTHER FILES
const authRouter = require("./routes/auth");
const projectRouter = require("./routes/project");


// INIT
const PORT = process.env.PORT || 3000;
const app = express();
const DB =
  "mongodb+srv://admin:admin@pop.bqmribf.mongodb.net/konvert_db?retryWrites=true&w=majority";

// middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cors()); // Allows incoming requests from any IP
app.use(authRouter);
app.use(projectRouter);


// Connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

// Define a MongoDB schema for your video data
const videoSchema = new mongoose.Schema({
  name: String,
  file: String,
});
const Video = mongoose.model('Video', videoSchema);

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploads will be stored in the 'uploads' folder
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));// Unique filename
  },
});
const upload = multer({ storage });


// Define an API endpoint for video upload
app.post('/api', upload.array('files'), async (req, res) => {
  try {
    console.log(req.files[0].filename); // Logs form body values
    const { name } = req.body;
    const file = 'uploads/' + req.files[0].filename;

    // Save video metadata to MongoDB
    const video = new Video({ name, file });
    await video.save();


    res.status(201).json({ message: 'Video uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error uploading video' });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
