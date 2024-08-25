const { where } = require("sequelize");
const Book = require("../models/book");
const db = require("../utils/database");

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
