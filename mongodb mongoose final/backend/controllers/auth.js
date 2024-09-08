const user = require("../models/user");
require("dotenv").config();
const bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
var sgTransport = require("nodemailer-sendgrid-transport");

var mailer = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
      process.env.MAIL_KEY,
    },
  })
);

exports.login = async (req, res, next) => {
  try {
    const User = await user.findOne({ email: req.body.email });

    if (!User) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Check password now
    const checkPassword = await bcrypt.compare(
      req.body.password,
      User.password
    );

    if (checkPassword) {
      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

exports.logout = async (req, res, next) => {
  req.session.destroy();

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

exports.signup = async (req, res, next) => {
  try {
    console.log("Req: ", req.body);

    const isUserExist = await user.findOne({ email: req.body.email });
    console.log(
      "Existing user: ",
      isUserExist ? isUserExist.email : "No existing user"
    );

    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: `User already exists with email ${isUserExist.email}`,
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    console.log("Hashed password: ", hashedPassword);

    await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // const mailRes = await mailer.sendMail({
    //   from: "shivam@kashyap.com",
    //   to: req.body.email,
    //   subject: "Signed up",
    //   text: "<h1>Succefully signed up!</h1>",
    // });

    console.log("mailRes: ", mailRes);

    return res.status(201).json({
      success: true,
      message: "Signed up successfully",
    });
  } catch (err) {
    console.error("Error during signup:", err);

    return res.status(500).json({
      success: false,
      message: "Error while signing up",
      error: err.message,
    });
  }
};
