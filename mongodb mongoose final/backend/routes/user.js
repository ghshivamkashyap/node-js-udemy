const express = require("express");
const { createUser, addToCart, getUserById } = require("../controllers/user");
const userRoutes = express.Router();

userRoutes.post("/createuser", createUser);
userRoutes.post("/addtocart", addToCart);
userRoutes.get("/getuserbyid/:id", getUserById);

module.exports = userRoutes;
