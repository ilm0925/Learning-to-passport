import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const name = req.user;
  if (!name) return res.redirect("/auth/login");
  res.render("home", { name: name });
});

export default router;
