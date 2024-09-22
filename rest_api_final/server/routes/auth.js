const express = require("express");
const { signup, login } = require("../controllers/auth");
const authRoutes = express.Router();

// GET /feed/posts
authRoutes.put("/signup", signup);
authRoutes.post("/login", login);

module.exports = authRoutes;
