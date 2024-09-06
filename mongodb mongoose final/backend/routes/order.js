const express = require("express");
const { createOrder, getAllOrders } = require("../controllers/order");

const orderRoutes = express.Router();

orderRoutes.post("/createorder", createOrder);
orderRoutes.get("/getallorders", getAllOrders);

module.exports = orderRoutes;
