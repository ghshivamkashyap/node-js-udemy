const mongodb = require("mongodb");
require("dotenv").config();
const mongoClient = mongodb.MongoClient;

let _db;

dbConnect = (cb) => {
  mongoClient
    .connect(process.env.MONGODB_URL)
    .then((client) => {
      console.log("Db connected");
      _db = client.db();
      cb();
    })
    .catch((err) => console.log("Db connection failed: ", err));
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No db found";
};

exports.dbConnect = dbConnect;
exports.getDb = getDb;
