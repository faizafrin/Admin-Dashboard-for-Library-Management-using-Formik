import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { API } from "../api/api";

const Home = () => {
  const [books, setBooks] = useState([]);

  function getBooks() {
    fetch(`${API}`, {
      method: "GET",
    }).then((res) => res.json().then((data) => setBooks(data)));
  }
  useEffect(() => {
    getBooks();
  }, []);

  function deleteBook(id) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => getBooks());
  }

  return (
    <Container className="container" minwidth="sm">
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 12, md: 12 }}
        >
          {books.map((book) => {
            return (
              <Grid key={book.id} item xs={3} sm={12} md={3}>
                <StudentCard
                  deleteBook={deleteBook}
                  data={book}
                  id={book.id}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;