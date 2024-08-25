const express = require("express");
const cors = require("cors");
const db = require("./utils/database");
const booksRoutes = require("./routes/books");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// dummy sql command for testing
// db.execute("select * from books")
//   .then((res) => console.log("Sql res: ", res))
//   .catch((err) => console.log("Sql error: ", err));

// routes
app.use("/books", booksRoutes);

app.listen(4000, (err) => {
  if (!err) {
    console.log("Server is running on port 4000");
  } else {
    console.log("Error: ", err);
  }
});
