const Book = require("../models/books");

// read all
exports.getAllBooks = async (req, res, next) => {
  try {
    const result = await Book.find();

    return res.status(200).json({
      success: true,
      message: "Get all books called",
      data: result ? result : [],
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
  const { title, author, pages, price } = req.body;
  console.log("Req file: ", req.file);

  const fixedFilePath = req.file.path.replace(/\\/g, "/");

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  // console.log("Data: ", data);
  try {
    let book = new Book({
      title: title,
      author: author,
      imageUrl: fileUrl,
      pages: pages,
      price: price,
    });

    let result = await book.save();

    return res.status(200).json({
      success: true,
      message: "Book added",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Book creation failed",
      error: err,
    });
  }
};

// // get by id
exports.getBookById = async (req, res, next) => {
  // console.log("Req query: ", req.params.id);

  try {
    const book = await Book.findById(req.params.id);

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

    const updateData = await Book.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          pages: req.body.pages,
          imageUrl: req.body.imageUrl,
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

// delete product by is
exports.deleteBookById = async (req, res, next) => {
  console.log("Req params: ", req.params.id);

  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted",
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
