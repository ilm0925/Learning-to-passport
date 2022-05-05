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
    successRedirect: "/main",
  })
);

router.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy(() => {
    res.redirect("/main");
  });
});

export default router;
