const express = require("express");
const { signup } = require("../controllers/auth");
const authRoutes = express.Router();

// GET /feed/posts
authRoutes.put("/signup", signup);

module.exports = authRoutes;
