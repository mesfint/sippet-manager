import express from "express";

const router = express.Router();

router.get("/mesfin/:name/:id", (req, res) => {
  res.send(" /mesfin");
});

router.get("/:id", (req, res) => {
  res.send("The id you specified: " + req.params.id);
});
//req.params object to access all the parameters you pass in the url.
router.get("/change/:id([0-9]{5})", (req, res) => {
  res.send("Id send " + req.params.id);
});
// router.get("/:id/:name", (req, res) => {
//   res.send("id  " + req.params.id + " name  " + req.params.name);
// });
router.get("/", (req, res) => {
  res.send("Initial World");
});

router.get("*", (req, res) => {
  res.send(" Sorry not found");
});

export default router;
