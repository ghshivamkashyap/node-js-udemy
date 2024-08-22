const { default: mongoose } = require("mongoose");

exports.booksSchema = new mongoose.Schema({
  name: String,
  pricee: Number,
  author: String,
});

// mongoose
