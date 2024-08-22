const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { userSchema } = require("./schema/userSchema");
const { booksSchema } = require("./schema/booksSchema");
const booksRoutes = require("./routes/booksRoute");
const authRoutes = require("./routes/authRoutes");


const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);



mongoose.connect("mongodb://localhost:27017/booksdb");

app.use("/books", booksRoutes);
app.use("/auth", authRoutes);

app.listen(4000, (err) => {
  if (!err) {
    console.log("Server is running on port 4000");
  } else {
    console.log("Error: ", err);
  }
});
