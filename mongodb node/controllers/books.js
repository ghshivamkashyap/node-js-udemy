const Book = require("../models/books");
const { getDb } = require("../utils/database");
const { ObjectId } = require("mongodb");

// read all
exports.getAllBooks = async (req, res, next) => {
  const db = getDb();
  try {
    const books = await db.collection("book").find({}).toArray(); // Convert cursor to array
    return res.status(200).json({
      success: true,
      message: "Get all books called",
      data: books,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

// create new
exports.addBook = async (req, res, next) => {
  const data = req.body;
  // console.log("Data: ", data);
  const book = new Book(data);

  await book
    .save()
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

// // get by id
exports.getBookById = async (req, res, next) => {
  console.log("Req query: ", req.params.id);
  const db = getDb();
  try {
    const book = await db
      .collection("book")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book fetched",
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
      params_passed: req.params.id,
    });
  }
};

// // edit book - patch request
exports.editBook = async (req, res, next) => {
  try {
    console.log("Req body: ", req.body);
    const db = getDb();
    const updateData = await db.collection("book").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          author: req.body.author,
          price: req.body.price,
        },
      }
    );
    if (!updateData) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book edited successfully",
      result: updateData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Edit book failed",
      error: err.message,
    });
  }
};
