const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");
const path = require("path");
const multer = require("multer");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname.split(" ").join("_"));
  },
});

app.use(express.json());
app.use(multer({ storage: storage }).single("file"));

app.use(bodyparser.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// routes
app.use("/feed", feedRoutes);

// db connect and start listening to port
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Db connected");
    app.listen(process.env.PORT, (err) => {
      if (!err) {
        console.log("Server is running on port", process.env.PORT);
      } else {
        console.log("Error: ", err);
      }
    });
  })
  .catch((err) => console.log("DB err", err));
