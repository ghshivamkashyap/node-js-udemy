const express = require("express");
const { shopController } = require("../controllers/shop");

const shopRoutes = express.Router();

shopRoutes.use("/", shopController);

module.exports = shopRoutes;
