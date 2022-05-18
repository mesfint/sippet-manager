import bodyParser from "body-parser";
import express from "express";
import { time } from "./controller/controller.js";

import router from "./router/router.js";

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

//serve static file 
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/snippet/add", router);
app.post("/sign_in", router);

app.use("/", router);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
