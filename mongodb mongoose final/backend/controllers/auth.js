const user = require("../models/user");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const sendgridTransport = require("nodemailer-sendgrid-transport");
var sgTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "Shivam kashyap",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log(info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

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

    const token = crypto.randomBytes(32).toString("hex");
    console.log("Random token: ", token);

    if (checkPassword) {
      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token: token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (err) {
    console.log("Error: ", err);
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
    const err = validationResult(req);
    console.log("Error in req: ", err);

    if (err?.errors.length) {
      console.log("I am error result array ");
      return res.status(422).json({
        success: false,
        message: err?.errors,
      });
    }

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
    const email = req.body.email;
    const title = "Test Email";
    const body = "<h1>This is a test email</h1><p>Sent using Nodemailer.</p>";
    const mailRes = await mailSender(email, title, body);

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
