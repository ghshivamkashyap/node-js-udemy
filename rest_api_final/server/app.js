const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const bodyparser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const authRoutes = require("./routes/auth");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));

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

// app.use(bodyparser.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// routes
app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

// db connect and start listening to port
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Db connected");
    const server = app.listen(process.env.PORT);

    const io = require("./socket").init(server);

    io.on("connection", (socket) => {
      console.log("Client connected on socket io");
    });
  })
  .catch((err) => console.log("DB err", err));
