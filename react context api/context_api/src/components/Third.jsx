import React, { useContext } from "react";
import DataContext from "../context/dataContext";

const Third = () => {
  const { data } = useContext(DataContext);
  return (
    <div>
      i am third
      {data.name}
      {data.age}
    </div>
  );
};

export default Third;
