import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { API } from "../api/api";

const AddBook = () => {
  const [bookDetails, setBooktDetails] = useState({
    name: "",
    image: "",
    author:"",
    language:"",
    publish:"",
    
    
  });
  
 const navigate = useNavigate();
  const addNewUser = async (newUser) => {

    try {
      const response = await fetch(
        `${API}`,
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      //setUser([...user, data])

      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form type={"Add"} bookDetails={bookDetails} onSubmit={addNewUser} />
    </div>
  );
};

export default AddBook;