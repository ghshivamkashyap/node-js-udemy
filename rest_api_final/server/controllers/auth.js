const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const user = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
    console.log("Req body signup: ", req.body);
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check for existing user
    const existingUser = await User.findOne({ email: email });

    console.log("existingUser: ", existingUser);

    if (existingUser) {
      return res.status(422).json({
        success: false,
        message: `User with email ${email} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: email,
      password: hashedPassword,
      name: name,
      status: "active",
    });

    if (user) {
      return res
        .status(201)
        .json({ success: true, message: "User created", data: user });
    }
  } catch (err) {
    console.log("User creation error");
    return res.status(400).json({
      success: false,
      message: "User creation failed",
      data: err.message,
    });
  }
};
