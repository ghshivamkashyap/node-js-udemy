const express = require("express");
const cors = require("cors");
// const session = require("express-session");
// const mongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();
const mongoose = require("mongoose");
const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// const store = new mongoDBStore({
//   uri: process.env.MONGODB_URL,
//   collection: "sessions",
//   // expires: 1 * 60 * 60,
// });

// use session (should be before routes)
// app.use(
//   session({
//     secret: "shivamkashyap",
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
// );

// routes
app.use("/books", booksRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/auth", authRoutes);

// db connect and start listening to port
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Db connected");
    app.listen(process.env.PORT, (err) => {
      if (!err) {
        console.log("Server is running on port", process.env.PORT);
      } else {
        console.log("Error: ", err);
      }
    });
  })
  .catch((err) => console.log("DB err", err));
