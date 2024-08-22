const express = require("express");
const { booksSchema } = require("../schema/booksSchema");
const { default: mongoose } = require("mongoose");
const { getAllBooks, addBook } = require("../controllers/booksController");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");

const booksRoutes = express.Router();

const Books = mongoose.model("books", booksSchema);

// mongoose

booksRoutes.get("/getallbooks/:param", getAllBooks);

booksRoutes.post("/addbook", auth, addBook);

module.exports = booksRoutes;
