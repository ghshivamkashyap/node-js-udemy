const mongodb = require("mongodb");
require("dotenv").config();
const mongoClient = mongodb.MongoClient;

dbConnect = (cb) => {
  mongoClient
    .connect(process.env.MONGODB_URL)
    .then((client) => {
      console.log("Db connected");
      cb(client);
    })
    .catch((err) => console.log("Db connection failed: ", err));
};

module.exports = dbConnect;
