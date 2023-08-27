// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");


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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
