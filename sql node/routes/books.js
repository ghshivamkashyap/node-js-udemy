const express = require("express");
const { getAllBooks, addBook } = require("../controllers/books");
const booksRoutes = express.Router();

booksRoutes.get("/getallbooks", getAllBooks);
// booksRoutes.get("getallbookbyid/:id");
// booksRoutes.get("deletebookbyid/:id");
booksRoutes.post("/addbook", addBook);
module.exports = booksRoutes;
