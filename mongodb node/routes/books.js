const express = require("express");
const booksRoutes = express.Router();
const {
  getAllBooks,
  addBook,
  getBookById,
  editBook,
} = require("../controllers/books");

booksRoutes.get("/getallbooks", getAllBooks);
booksRoutes.get("/getbookbyid/:id", getBookById);
booksRoutes.patch("/editbook/:id", editBook);
booksRoutes.post("/addbook", addBook);

module.exports = booksRoutes;
