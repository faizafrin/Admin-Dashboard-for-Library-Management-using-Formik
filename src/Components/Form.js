import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";

const formValidationSchema = yup.object({
  name: yup.string().required("Please enter a Name"),
  image:yup.string().required("Please enter a img link"),
  author:yup.string().required("please enter the author name"),
  language:yup.string().required("please say language of the book"),
  publish:yup.string().required("please enter a published year"),
 
});

const Form = ({ onSubmit, type, bookDetails }) => {
  const { handleSubmit, handleChange, errors, handleBlur, touched, values } =
    useFormik({
      initialValues: {
        name: bookDetails.name,
        image: bookDetails.image,
        author: bookDetails.author,
        language: bookDetails.language,
        publish: bookDetails.publish,
      
      },
      enableReinitialize: `${type === "Add" ? false : true}`,
      validationSchema: formValidationSchema,
      onSubmit: (newBook) => {
         console.log('onClicked',newBook)
         addNewBook(newBook)
      },
    });
    const navigate = useNavigate()
    const addNewBook = async (newBook) => {

      try {
        const response = await fetch(
          `${API}`,
          {
            method: "POST",
            body: JSON.stringify(newBook),
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {type === "Add" ? "Add" : "Edit"} Book Details
          </Typography>{/*Use typography to present your design and content as clearly and efficiently as possible.*/}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>{/*The Material Design responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.*/}
                <TextField
                  error={errors.name && touched.name ? true : false}
                  helperText={errors.name && touched.name ? errors.name : ""}
                  onBlur={handleBlur}
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.image && touched.image ? true : false}
                  helperText={errors.image && touched.image ? errors.image : ""}
                  onChange={handleChange}
                  value={values.image}
                  fullWidth
                  id="image"
                  label="Profile Picture"
                  onBlur={handleBlur}
                  name="image"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  error={errors.author && touched.author ? true : false}
                  helperText={errors.author && touched.author ? errors.author : ""}
                  onChange={handleChange}
                  value={values.author}
                  fullWidth
                  id="author"
                  label="Author Name"
                  onBlur={handleBlur}
                  name="author"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  error={errors.language && touched.language ? true : false}
                  helperText={errors.language && touched.language ? errors.language : ""}
                  onChange={handleChange}
                  value={values.language}
                  fullWidth
                  id="lang"
                  label="language of the book"
                  onBlur={handleBlur}
                  name="language"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  error={errors.publish && touched.publish ? true : false}
                  helperText={errors.publish && touched.publish ? errors.publish : ""}
                  onChange={handleChange}
                  value={values.publish}
                  fullWidth
                  id="publish"
                  label="Published year"
                  onBlur={handleBlur}
                  name="publish"
                />
              </Grid>
              </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {type === "Add" ? "Add" : "Edit"}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Form;