const { default: mongoose } = require("mongoose");
const { booksSchema } = require("../schema/booksSchema");

const Books = mongoose.model("books", booksSchema);

exports.getAllBooks = async (req, res, next) => {
//   console.log("books route");
//   console.log("get all books called: ", req.params.name);
  try {
    let books = await Books.find();
    return res.status(200).json({
      success: true,
      message: "All books fetched success",
      query: req.query,
      params: req.params,
      data: books,
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(400).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

exports.addBook = async (req, res, next) => {
  try {
    let bookData = req.body;
    console.log("Book: ", bookData);
    // return;
    let books = await Books.create({
      name: bookData.name,
      pricee: bookData.pricee,
      author: bookData.author,
    });
    return res.status(200).json({
      success: true,
      message: "book added success",
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(400).json({
      success: false,
      message: "Error adding book",
    });
  }
};
