const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Book", BookSchema);
