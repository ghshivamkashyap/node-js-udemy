const express = require("express");
const cors = require("cors")
const bodyparser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));

// routes

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
