import express from "express";
import model from "../lib/model.js";

const router = express.Router();

const isWriter = (req) => {
  const ID = req.user.ID;
  const paramID = req.params.id;
  const post = model.FindPost(paramID);
  if (post && post.Writer == ID) return post;
  else if (post == undefined) return undefined;
  return false;
};

const invalidAccess = (res, text) => {
  res.send(`<script>alert('${text}'); history.back(0)</script>`);
};

router.get("/", (req, res) => {
  res.redirect("/main");
});

router.get("/edit/:id", (req, res, next) => {
  // 1.만약에 유저가 쓴 글이면 수정페이지를 띄움
  // 2.유저가 쓴 글이 아니라면 튕겨냄
  // 3. id를 통해 찾는 글이 존재하지않으면 존재하지않는 페이지라고 해줌
  const post = isWriter(req);
  if (post)
    return res.render("edit.ejs", { Title: post.Title, desc: post.Desc });
  post == undefined
    ? invalidAccess(res, "존재하지않는 페이지입니다")
    : invalidAccess(res, "접근할수없습니다.");
});

router.delete("/delete/:id", (req, res, next) => {
  const post = isWriter(req);
  if (post) {
    const idx = model.getIndex(post.id);
    model.Delete(idx);
    return res.json({ message: "삭제" });
  }
  return res.json({ message: "접근할수없습니다." });
});

router.get("/main", (req, res) => {
  if (!req.user) return res.redirect("/auth/login");
  const name = req.user.Name;
  const Topic = model.AllPost();
  res.render("home/home", { name: name, Topic: Topic });
});

router.get("/create", (req, res) => {});

export default router;
