import express from "express";

const router = express.Router();

router.get("/snippet/add", function (req, res) {
  res.render("index", {
    name: "TutorialsPoint",
    url: "http://www.tutorialspoint.com",
  });
});

router.get("/", (req, res) => {
  res.send("Initial Empty");
});

router.get("*", (req, res) => {
  res.send(" Sorry not found");
});

export default router;
