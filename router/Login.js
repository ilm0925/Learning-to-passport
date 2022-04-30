import express from "express";
const router = express.Router();
import passport from "passport";

const user = {
  name: "Egoing",
  id: "Egoing123",
  pwd: "12345",
};
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
