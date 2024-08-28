const express = require("express");
const { createUser } = require("../controllers/user");
const userRoutes = express.Router();

userRoutes.post("/createuser", createUser);

module.exports = userRoutes;
