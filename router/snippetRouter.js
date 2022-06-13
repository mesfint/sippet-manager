import express from "express";
import axios from "axios";
import Snippet from "../model/snippet.js";
import {
  create,
  getSnippetsById,
  getAll,
  allSnippets,
  updateSnippets,
  finOneSnippet,
  deleteSnippet,
} from "../controller/controller.js";

const router = express.Router();

router.get("/", allSnippets);
router.get("/:id", finOneSnippet);

//create snippet
router.post("/", create);

//get all snippets
router.get("/snippets", getAll);

//get Snippet by Id
router.get("/snippets/:id", getSnippetsById);

//Update Snippets

router.put("/:id", updateSnippets);

router.delete("/snippets/:id", deleteSnippet);

// router.get("/", (req, res) => {
//   res.send("Initial Empty");
// });

router.get("*", (req, res) => {
  res.send(" Sorry not found");
});

export default router;
