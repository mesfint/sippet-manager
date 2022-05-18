import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Initial Empty");
});
router.get("/snippet/add", function (req, res) {
  res.render("addSnippet", {
    name: "TutorialsPoint",
    url: "http://www.tutorialspoint.com",
  });
});

router.get("*", (req, res) => {
  res.send(" Sorry not found");
});

export default router;
