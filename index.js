import bodyParser from "body-parser"; //For parsing JSON and url-encoded data)
import multer from "multer"; //For handling file uploads
import express from "express";
import { time } from "./controller/controller.js";

import router from "./router/router.js";

const app = express();
const upload = multer();

app.set("view engine", "pug");
app.set("views", "./views");

//Get form
app.get("/", (req, res) => {
  res.render("form");
});
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
app.post("/", function (req, res) {
  console.log(req.body);
  res.send("recieved your request");
});

app.post("/snippet/add", router);
app.post("/sign_in", router);

//app.use("/", router);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
