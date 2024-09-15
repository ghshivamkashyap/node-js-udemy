const express = require("express");
const { uploadFile, getFile, getGeneratedPdf } = require("../controllers/upload");

const uploadFileRoutes = express.Router();

uploadFileRoutes.post("/uploadfile", uploadFile);
uploadFileRoutes.get("/getfile", getFile);
uploadFileRoutes.get("/getpdf", getGeneratedPdf);

module.exports = uploadFileRoutes;
