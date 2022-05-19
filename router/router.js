import express from "express";
import axios from "axios";
import Snippet from "../model/snippet.js";
import { create, getSnippetsById, getAll } from "../controller/controller.js";

const userNames = ["Sean", "George", "Roger", "Timothy", "Pierce", "Daniel"];
const bestMovie = "Casino Royale";
const licensedToKill = true;

const router = express.Router();

router.get("/snippet", function (req, res) {
  res.render("index");
});
router.get("/AllSnippets", function (req, res) {
  axios.get("http://localhost:5000/snippets").then((response) => {
    const snippets = response.data;
    res.render("index", {
      snippets,
    });
  });
});

//create snippet
router.post("/snippet", create);

//get all snippets
router.get("/snippets", getAll);

//get Snippet by Id
router.get("/snippet/:id", getSnippetsById);

router.get("/", (req, res) => {
  res.send("Initial Empty");
});

router.get("*", (req, res) => {
  res.send(" Sorry not found");
});

export default router;
