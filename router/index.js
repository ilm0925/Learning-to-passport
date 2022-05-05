import express from "express";
import model from "../lib/model.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/main");
});

router.get("/edit/:id", (req, res) => {
  res.render("edit");
});

router.get("/main", (req, res) => {
  if (!req.user) return res.redirect("/auth/login");
  const name = req.user.Name;
  const Topic = model.AllPost();
  res.render("home/home", { name: name, Topic: Topic });
});

router.get("/create", (req, res) => {});

export default router;
