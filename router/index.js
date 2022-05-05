import express from "express";
import model from "../lib/model.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/main");
});

router.get("/edit/:id", (req, res) => {
  const ID = req.user.ID;
  const paramID = req.params.id;
  const post = model.FindPost(paramID);

  if (post && post.Writer == ID) {
    res.render("edit", { Title: post.Title, desc: post.Desc });
  } else {
    res.send("<script>alert('접근할수없습니다.'); history.back(0)</script>");
  }
});

router.get("/main", (req, res) => {
  if (!req.user) return res.redirect("/auth/login");
  const name = req.user.Name;
  const Topic = model.AllPost();
  res.render("home/home", { name: name, Topic: Topic });
});

router.get("/create", (req, res) => {});

export default router;
