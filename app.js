import express from "express";
import ejs from "ejs";
import path from "path";

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

import index from "./router/index.js";
import login from "./router/login.js";

import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/", index);
app.use("/auth", login);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
