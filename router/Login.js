import express from "express";
const router = express.Router();
import passport from "passport";

router.get("/login", (req, res) => {
  if (req.user) return res.redirect("/");
  res.render("login.ejs");
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    console.log("성공?");
    res.redirect("http://localhost:3000/");
  }
);

router.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy(() => {
    res.redirect("/");
  });
});

export default router;
