const express = require("express");
const { getFeed } = require("../controllers/feed");

const feedRoutes = express.Router();

feedRoutes.get("/getfeed", getFeed);
// feedRoutes.get("/getbookbyid/:id");
// feedRoutes.patch("/editbook/:id");
// feedRoutes.post("/addbook");
// feedRoutes.delete("/deletebookbyid/:id");

module.exports = feedRoutes;
