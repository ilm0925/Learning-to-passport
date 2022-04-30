import express from "express";
const router = express.Router();
import passport from "passport";

router.get("/login", (req, res) => {
  res.render("login.ejs");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

export default router;
