import express from "express";

import {
  create,
  createForm,
  getSnippetsById,
  getAll,
  allSnippets,
  updateSnippets,
  finOneSnippet,
  deleteSnippet,
} from "../controller/controller.js";

const router = express.Router();

//localhost:5000
router.get("/", allSnippets);


//create snippet
router.get("/create", createForm)
router.post("/create", create);

//get all snippets
//router.get("/snippets", getAll);

//get Snippet by Id
//router.get("/snippets/:id", getSnippetsById);

//Update Snippets

router.get("/edit/:id", finOneSnippet);

router.put("/edit/:id", updateSnippets);

router.delete("/snippets/:id", deleteSnippet);


// router.get("/", (req, res) => {
//   res.send("Initial Empty");
// });

router.get("*", (req, res) => {
  res.send(" Sorry not found");
});

export default router;
