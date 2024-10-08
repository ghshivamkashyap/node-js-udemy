import axios from "axios";
import React, { useEffect, useState } from "react";

const AddBookForm = (props) => {
  const addBook = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!formData.author || !formData.price || !formData.name) {
      console.log("Fill all values");
      return;
    }

    let res = await axios.post(
      "http://localhost:4000/books/addbook",
      {
        ...formData,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiX2lkIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsIl9fdiI6ImluaXQifSwic3RhdGVzIjp7ImluaXQiOnsiX2lkIjp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NmM2ZjI3MDcwNzU1NDQxMmNiNmFmMDIiLCJ1c2VybmFtZSI6IlN1aGFuaSBrYXBhc2l5YSIsInBhc3N3b3JkIjoiJDJhJDEwJG93MWlJLmlWSnBuLk9wMVNIMXF5N3VBOTBlS3BFdFhzOG5GV25pUk9GM3FYd25GbVZmZjZTIiwiX192IjowfSwiaWF0IjoxNzI0MzQ1NjAwfQ.BayFRBhSK7AivLR2eKoJ8nAb0iRhunaizHSsaTeADWA`,
        },
      }
    );

    if (res.status == 200) {
      console.log(props);
      props.getaAllBooks();
      setFormData({
        name: "",
        price: "",
        author: "",
      });
    }

    console.log("Res: ", res);
  };

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    author: "",
  });

  useEffect(() => {
    console.log("Formdata: ", formData);
  }, [formData, setFormData]);

  return (
    <div>
      <form onSubmit={addBook}>
        <input type="text"></input>
        <input
          value={formData.price}
          onChange={(e) => {
            setFormData({
              ...formData,
              price: e.target.value,
            });
          }}
          type="number"
          name="pricee"
          id="pricee"
          className="block w-[200px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Book Price"
        ></input>{" "}
        <input
          value={formData.name}
          onChange={(e) => {
            setFormData({
              ...formData,
              name: e.target.value,
            });
          }}
          type="text"
          name="name"
          id="name"
          className="block w-[200px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Book name"
        ></input>{" "}
        <input
          value={formData.author}
          onChange={(e) => {
            setFormData({
              ...formData,
              author: e.target.value,
            });
          }}
          type="text"
          name="author"
          id="author"
          className="block w-[200px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Author name"
        ></input>
        <button type="submit">Adfd new book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
// i am add book form
