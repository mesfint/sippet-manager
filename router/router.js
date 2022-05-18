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
router.get("/firstpage", (req, res) => {
  res.render("first_view", {
    user: { name: "", age: "" },
  });
});
router.get("/components", (req, res) => {
  res.render("content", {
    user: { name: "", age: "" },
  });
});

router.get("*", (req, res) => {
  res.send(" Sorry not found");
});

export default router;
