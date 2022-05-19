import express from "express";
import Snippet from "../model/snippet.js";
import {create, getAll} from "../controller/controller.js"

const router = express.Router();

router.get("/snippet", function (req, res) {
  res.render("index");
});

//create snippet 
router.post("/snippet", create);
router.get("/components", (req, res) => {
  res.render("content", {
    user: { name: "", age: "" },
  });
});

//get all snippets
router.get("/snippets", getAll)


router.get("/", (req, res) => {
  res.send("Initial Empty");
});

router.get("*", (req, res) => {
  res.send(" Sorry not found");
});

export default router;
