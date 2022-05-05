import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/main");
  next();
});

router.get("/main", (req, res) => {
  if (!req.user) return res.redirect("/auth/login");
  const name = req.user.Name;
  res.render("home", { name: name });
});

export default router;
