const express = require("express");
const { booksSchema } = require("../schema/booksSchema");
const { default: mongoose } = require("mongoose");
const { getAllBooks, addBook } = require("../controllers/booksController");
const jwt = require("jsonwebtoken");

const booksRoutes = express.Router();

const Books = mongoose.model("books", booksSchema);

// mongoose
booksRoutes.use((req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, "kashyapshivam");
    req.user = decoded;
    console.log("Token varifierd");
    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});

booksRoutes.get("/getallbooks/:param", getAllBooks);

booksRoutes.post("/addbook", addBook);

module.exports = booksRoutes;
