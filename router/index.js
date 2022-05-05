import express from "express";
import model from "../lib/model.js";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/main");
  next();
});

router.get("/main", (req, res) => {
  if (!req.user) return res.redirect("/auth/login");
  const name = req.user.Name;
  const Topic = model.AllPost();
  res.render("home", { name: name, Topic: Topic });
});

export default router;
