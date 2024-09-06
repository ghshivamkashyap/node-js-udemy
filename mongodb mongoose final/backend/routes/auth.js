const express = require("express");
const { login } = require("../controllers/auth");
const authRoutes = express.Router();

authRoutes.post("/login", login);

module.exports = authRoutes;
