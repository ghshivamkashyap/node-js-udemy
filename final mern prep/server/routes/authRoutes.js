const express = require("express");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRoutes = express.Router();

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("users", userSchema);

authRoutes.post("/signup", async (req, res, next) => {
  console.log("Signup req: ", req.body);
  const hashespassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    username: req.body.username,
    password: hashespassword,
  });

  console.log("User: ", user);
  res.status(201).json({
    success: true,
    message: "User created success",
  });
});

authRoutes.post("/login", async (req, res, next) => {
  console.log("login req: ", req.body);
  let user = await User.findOne({
    username: req.body.username,
  });

  if (user && bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ ...user }, "kashyapshivam");
    res.status(201).json({
      success: true,
      message: "login success",
      jwtToken: token,
    });
  }

  // return res.status(201).json({
  //   success: true,
  //   message: "login success",
  //   data: user,
  // });
});

module.exports = authRoutes;
