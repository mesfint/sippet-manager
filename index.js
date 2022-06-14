import bodyParser from "body-parser"; //For parsing JSON and url-encoded data)
import multer from "multer"; //For handling file uploads
import express from "express";
import methodOverride  from 'method-override'
import mongoose from "mongoose";

import snippetRouter from "./router/snippetRouter.js";

const app = express();
const upload = multer();

app.set("view engine", "pug");
app.set("views", "./views");

//serve static file
app.use(express.static("public"));

// for parsing multipart/form-data
app.use(upload.array());

// for parsing application/json
app.use(bodyParser.json());


//form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//to overrid PUT Method by POST
app.use(methodOverride('_method'))

app.use("/", snippetRouter);




app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
