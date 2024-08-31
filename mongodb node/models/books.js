const { getDb } = require("../utils/database");

class Book {
  constructor(data) {
    this.name = data.name;
    this.author = data.author;
    this.price = data.price;
  }
  save() {
    // console.log("This: ", this);
    const db = getDb();
    return db
      .collection("book")
      .insertOne({ name: this.name, author: this.author, price: this.price })
      .then((res) => {
        console.log("Result: ", res);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  }
}

module.exports = Book;
