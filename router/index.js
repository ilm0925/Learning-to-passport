import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/main");
  next();
});

router.get("/main", (req, res) => {
  const name = req.user.Name;
  if (!name) return res.redirect("/auth/login");
  res.render("home", { name: name });
});

export default router;
