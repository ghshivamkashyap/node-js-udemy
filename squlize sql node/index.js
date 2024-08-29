const express = require("express");
const cors = require("cors");
const db = require("./utils/database");
const booksRoutes = require("./routes/books");
const sequelize = require("./utils/database");
const userRoutes = require("./routes/user");
const Book = require("./models/book");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(async (req, res, next) => {
  await User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log("Err fetching user: ", err));
});

// dummy sql command for testing
// db.execute("select * from books")
//   .then((res) => console.log("Sql res: ", res))
//   .catch((err) => console.log("Sql error: ", err));

// routes
app.use("/books", booksRoutes);
app.use("/user", userRoutes);

// setting relations bw tables
Book.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Book);

// instanciating the tables in db
sequelize
  .sync()
  .then((res) => {
    // console.log("Db res: ", res);
    app.listen(4000, (err) => {
      if (!err) {
        console.log("Server is running on port 4000");
      } else {
        console.log("Error: ", err);
      }
    });
  })
  .catch((err) => console.log("DB error: ", err));
