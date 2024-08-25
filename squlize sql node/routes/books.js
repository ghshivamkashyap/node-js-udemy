const express = require("express");
const { getAllBooks, addBook, getBookById } = require("../controllers/books");
const booksRoutes = express.Router();

booksRoutes.get("/getallbooks", getAllBooks);
booksRoutes.get("/getbookbyid/:id", getBookById);
// booksRoutes.get("deletebookbyid/:id");
booksRoutes.post("/addbook", addBook);

module.exports = booksRoutes;
