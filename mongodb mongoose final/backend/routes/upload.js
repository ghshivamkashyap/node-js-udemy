const express = require("express");
const { uploadFile } = require("../controllers/upload");

const uploadFileRoutes = express.Router();

uploadFileRoutes.post("/uploadfile", uploadFile);

module.exports = uploadFileRoutes;
