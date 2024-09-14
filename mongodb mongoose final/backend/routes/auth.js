const express = require("express");
const { check } = require("express-validator");
const { login, logout, signup } = require("../controllers/auth");
const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.post(
  "/signup",
  //   check("email").isEmail(),
  check("email").isEmail().withMessage("Please provide a valid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  // .matches(/\d/)
  // .withMessage("Password must contain a number")
  // .matches(/[A-Z]/)
  // .withMessage("Password must contain an uppercase letter")
  // .matches(/[a-z]/)
  // .withMessage("Password must contain a lowercase letter")
  // .matches(/[@$!%*?&#]/)
  // .withMessage("Password must contain a special character")

  signup
);

module.exports = authRoutes;
