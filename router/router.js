import express from "express";
import Snippet from "../model/snippet.js";

const router = express.Router();

router.get("/snippet", function (req, res) {
  res.render("index");
});

router.post("/snippet", function (req, res) {
  const snippetInfo = req.body; //get the parsed information

  if (!snippetInfo.title || !snippetInfo.description || !snippetInfo.language) {
    res.render("show_message", {
      message: "Please fill in all fields",
      type: "error",
    });
  } else {
    const newSnippet = new Snippet({
      title: snippetInfo.title,
      description: snippetInfo.description,
      language: snippetInfo.language,
    });
    newSnippet.save((err) => {
      if (err) {
        res.render("show_message", {
          message: "Error saving snippet to db",
          type: "error",
        });
      } else {
        //res.redirect("/snippet");
        res.render("show_message", {
          message: "New snippet added",
          type: "success",
          snippet: snippetInfo,
        });
      }
    });
  }
});
router.get("/components", (req, res) => {
  res.render("content", {
    user: { name: "", age: "" },
  });
});
router.get("/", (req, res) => {
  res.send("Initial Empty");
});

router.get("*", (req, res) => {
  res.send(" Sorry not found");
});

export default router;
