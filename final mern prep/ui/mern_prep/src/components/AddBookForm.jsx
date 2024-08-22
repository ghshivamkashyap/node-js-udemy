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
          Authorization: `Bearer YOUR_TOKEN_HERE`,
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
