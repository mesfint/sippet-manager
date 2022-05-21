import bodyParser from "body-parser"; //For parsing JSON and url-encoded data)
import multer from "multer"; //For handling file uploads
import express from "express";
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

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", snippetRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
