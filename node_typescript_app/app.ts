// const express = require("express");
import express from "express";
import todoRouter from "./routes/todo";
import bodyParser from "body-parser";

const app = express();

// app.use(express.json());
app.use(bodyParser.json());

app.use("todo", todoRouter);

app.listen(process.env.PORT, () => {
  console.log("i am connected");
});
