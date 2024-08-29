const express = require("express");
const cors = require("cors");
const dbConnect = require("./utils/database");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

dbConnect((client) => {
  // console.log("Client: ", client);
  app.listen(4000, (err) => {
    if (!err) {
      console.log("Server is running on port 4000");
    } else {
      console.log("Error: ", err);
    }
  });
});
