import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("main", { data: "Main" });
});

export default router;
