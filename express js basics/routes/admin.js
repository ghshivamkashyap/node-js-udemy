const express = require("express");
const { adminController, slaveController } = require("../controllers/admin");

const adminRoutes = express.Router();

adminRoutes.use((req, resd, next) => {
  console.log("middleware 1");
  next();
});

adminRoutes.post("/a", adminController);
adminRoutes.post("/b", slaveController);

module.exports = adminRoutes;
