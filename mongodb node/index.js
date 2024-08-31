const express = require("express");
const cors = require("cors");

const booksRoutes = require("./routes/books");
const { dbConnect } = require("./utils/database");


const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// routes
app.use("/books", booksRoutes);
// app.use("/books", booksRoutes);
// app.use("/user", userRoutes);

dbConnect(() => {
  // console.log("Client: ", client);
  app.listen(4000, (err) => {
    if (!err) {
      console.log("Server is running on port 4000");
    } else {
      console.log("Error: ", err);
    }
  });
});
