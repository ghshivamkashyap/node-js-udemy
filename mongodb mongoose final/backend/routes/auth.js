const express = require("express");
const { login, logout, signup } = require("../controllers/auth");
const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.post("/signup", signup);

module.exports = authRoutes;
