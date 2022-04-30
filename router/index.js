import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.user);
  res.render("home", { data: "Main" });
});

export default router;
