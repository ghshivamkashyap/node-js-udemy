const db = require("../utils/database");

exports.getAllBooks = async (req, res, next) => {
  let ans = null;
  await db
    .execute("SELECT * FROM books")
    .then((result) => {
      ans = result[0];
      return res.status(200).json({
        success: true,
        message: "Data fetched",
        data: result[0],
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Error getting all books",
        error: err,
      });
    });

  console.log("Ans: ", ans);
};

exports.addBook = async (req, res, next) => {
  await db
    .execute("INSERT INTO books (name, price, author) VALUES (?, ?, ?)", [
      req.body.name,
      req.body.price,
      req.body.author,
    ])
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
  let ans = null;
  await db
    .execute("SELECT * FROM books where id=?", [req.params.id])
    .then((result) => {
      ans = result[0];
      return res.status(200).json({
        success: true,
        message: "Data fetched",
        data: result[0],
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Error getting all books",
        error: err,
      });
    });

  console.log("Ans: ", ans);
};
