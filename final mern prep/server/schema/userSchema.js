const { default: mongoose } = require("mongoose");

exports.userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
