import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBookForm from "./AddBookForm";

const Books = () => {
  const [books, steBooks] = useState([]);

  const getaAllBooks = async () => {
    console.log("get all books called");
    let res = await axios.get("http://localhost:4000/books/getallbooks/param420/?name=shivam&surname=kashyap");

    steBooks(res.data.data);
    // console.log("Books: ", books);
  };
  useEffect(() => {
    getaAllBooks();
  }, []);

  return (
    <div>
      <ul>
        {books &&
          books.length &&
          books.map((book) => <li key={book?._id}>{book.name}</li>)}
      </ul>
      <AddBookForm getaAllBooks={getaAllBooks} data="shivam kahsyap" />
    </div>
  );
};

export default Books;
