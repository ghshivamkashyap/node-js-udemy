const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// connect db
// mongoose
//   .connect("mongodb://localhost:27017", {
//     dbName: "bookShop",
//   })
//   .then(() => console.log("connected to db success"))
//   .catch(() => console.log("Error connecting to db "));

const schema = new mongoose.Schema({
  name: String,
  pricee: Number,
  author: String,
});
const db = mongoose.connection;
db.on("connected", async () => {
  await db.dropDatabase();
  console.log("Old database dropped, now using the new one");
});

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "bookShop",
  })
  .then(() => console.log("Connected to db successfully"))
  .catch((err) => console.log("Error connecting to db: ", err));

const Books = mongoose.model("books", schema);

app.get("/getallbooks", async (req, res, next) => {
  try {
    let books = await Books.find();
    return res.status(200).json({
      success: true,
      message: "All books fetched success",
      data: books,
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(400).json({
      success: false,
      message: "Some error occurred",
    });
  }
});

app.post("/addbook", async (req, res, next) => {
  try {
    let bookData = req.body;
    console.log("Book: ", bookData);
    // return;
    let books = await Books.create({
      ...bookData,
    });
    return res.status(200).json({
      success: true,
      message: "book added success",
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(400).json({
      success: false,
      message: "Error adding book",
    });
  }
});

app.listen(3000, (err) => {
  if (!err) {
    console.log("Server is running on port 3000");
  } else {
    console.log("Error: ", err);
  }
});
