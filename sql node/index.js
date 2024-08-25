const express = require("express");
const { pool } = require("./utils/database");

const app = express();
app.use(express.json());

pool.execute();

app.listen(4000, (err) => {
  if (!err) {
    console.log("Server is running on port 4000");
  } else {
    console.log("Error: ", err);
  }
});
