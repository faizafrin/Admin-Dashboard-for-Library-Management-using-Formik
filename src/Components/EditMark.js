import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "./Form";
import { API } from "../api/api";

const EditMark = () => {
  const { id } = useParams();

  const [bookDetails, setBooktDetails] = useState({
    name: "",
    image: "",
    author:"",
    language:"",
    publish:"",
  });

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((response) => response.json())
      .then((data) =>
        setBooktDetails({
          name: data.name,
          image: data.image,
          author:data.author,
          language:data.language,
          publish:data.publish,
        })
      );
  }, []);
  const navigate = useNavigate();
  const onEdit = (updatedData) => {
    fetch(`${API}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" },
    }).then(() => navigate("/"));
  };
  return (
    <div>
      <Form type={"Edit"} bookDetails={bookDetails} onSubmit={onEdit} />
    </div>
  );
};

export default EditMark;