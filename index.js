// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');



// IMPORTS FROM OTHER FILES
const authRouter = require("./routes/auth");
const projectRouter = require("./routes/project");
const projectVideoRouter = require("./routes/project_video");


// INIT
const PORT = process.env.PORT || 3000;
const app = express();
const DB =
  "mongodb+srv://admin:admin@pop.bqmribf.mongodb.net/konvert_db?retryWrites=true&w=majority";


// middleware
app.use(express.json());
app.use(cors()); // Allows incoming requests from any IP
app.use(authRouter);
app.use(projectRouter);
app.use(projectVideoRouter);

// Connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

// Serve the HTML form for video upload
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Video Upload</h1>
        <form method="POST" action="/api/add-project-video" enctype="multipart/form-data">
          <input type="file" name="video" accept="video/*">
          <input type="text" name="name" placeholder="name">
          <input type="text" name="description" placeholder="description">
          <input type="text" name="quality" placeholder="quality">
          <input type="text" name="userId" placeholder="userId">
          <button type="submit">Upload Video</button>
        </form>
      </body>
    </html>
  `);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
