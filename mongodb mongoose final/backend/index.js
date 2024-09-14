const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
// const mongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();
const multer = require("multer");
const mongoose = require("mongoose");
const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const authRoutes = require("./routes/auth");
const uploadFileRoutes = require("./routes/upload");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);

// multer congfig
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(multer({ storage: storage }).single("image"));

// routes
app.use("/books", booksRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadFileRoutes);

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
