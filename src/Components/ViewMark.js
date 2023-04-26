import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import BasicTable from "./MarksTable";
import { API } from "../api/api";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ViewMark = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book.name)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <Card
      variant="outlined"
      className="view"
      sx={{ maxWidth: 600, maxHeight: 700 }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={book.image}
          alt={book.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {book.name}
          </Typography>
          <Typography gutterBottom variant="h6" color="text.secondary">
            Author : {book.author}
          </Typography>
          <Typography gutterBottom variant="h6" color="text.secondary">
            language : {book.language}
          </Typography>
          <Typography gutterBottom variant="h6" color="text.secondary">
            Publish : {book.publish}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
     
      </CardActions>
    </Card>
  );
};

export default ViewMark;