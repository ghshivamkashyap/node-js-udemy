const { where } = require("sequelize");
const Book = require("../models/book");
const db = require("../utils/database");

// read all
exports.getAllBooks = async (req, res, next) => {
  await Book.findAll()
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "All books found success",
        result: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Add book failed",
        error: err,
      });
    });
};

// create new
exports.addBook = async (req, res, next) => {
  await Book.create({
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
  })
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "Book added",
        result: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Add book failed",
        error: err,
      });
    });
};

// get by id
exports.getBookById = async (req, res, next) => {
  console.log("Req query: ", req.params.id);
  await Book.findAll({ where: { id: req.params.id } })
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "Book found success",
        result: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Add book failed",
        error: err,
      });
    });
};

// edit book - patch request
exports.editBook = async (req, res, next) => {
  try {
    console.log("Req body: ", req.body);

    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    book.name = req.body.name;
    book.price = req.body.price;
    book.author = req.body.author;
    book.updatedAt = Date.now();

    const updatedBook = await book.save();

    return res.status(200).json({
      success: true,
      message: "Book edited successfully",
      result: updatedBook,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Edit book failed",
      error: err.message,
    });
  }
};
