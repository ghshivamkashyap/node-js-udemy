const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);

app.use(express.json());

// db connect and start listening to port
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Db connected");
    console.log(`Server started at port ${process.env.PORT}`)
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log("DB err", err));
