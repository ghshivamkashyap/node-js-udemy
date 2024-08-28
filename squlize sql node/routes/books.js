const express = require("express");
const {
  getAllBooks,
  addBook,
  getBookById,
  editBook,
} = require("../controllers/books");
const booksRoutes = express.Router();

booksRoutes.get("/getallbooks", getAllBooks);
booksRoutes.get("/getbookbyid/:id", getBookById);
booksRoutes.patch("/editbook/:id", editBook);
booksRoutes.post("/addbook", addBook);

module.exports = booksRoutes;
