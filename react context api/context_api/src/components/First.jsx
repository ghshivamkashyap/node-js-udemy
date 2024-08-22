import React, { useContext, useEffect } from "react";
import Second from "./Second";
import DataContext from "../context/dataContext";

const First = () => {
  const { setData } = useContext(DataContext);
  useEffect(() => {
    setData({
      name: "shivamkashyap",
      age: 23,
    });
  }, []);
  return (
    <div>
      i am first
      <Second />
    </div>
  );
};

export default First;
