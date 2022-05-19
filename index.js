import bodyParser from "body-parser"; //For parsing JSON and url-encoded data)
import multer from "multer"; //For handling file uploads
import express from "express";
import mongoose from "mongoose";
import { time } from "./controller/controller.js";

import router from "./router/router.js";

//connect remote database
mongoose
  .connect(
    "mongodb+srv://user:user@cluster0.oeybl.mongodb.net/snippets?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("database connected");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  });

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

//The req.body object contains your parsed request body.
// app.post("/", function (req, res) {
//   console.log(req.body);
//   res.send("recieved your request");
// });

//Get form
app.get("/snippet", (req, res) => {
  res.render("index");
});
app.post("/snippet", router);
app.post("/components", router);
