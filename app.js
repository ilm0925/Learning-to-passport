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
import { Strategy } from "passport-local";

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const user = {
  name: "Egoing",
  id: "Egoing123",
  pwd: "12345",
};

passport.use(
  new Strategy(
    {
      usernameField: "id",
      passwordField: "pwd",
    },
    (id, pwd, done) => {
      if (id != user.id) {
        console.log(1);
        return done(null, false, { message: "invalid ID" });
      } else if (pwd != user.pwd) {
        console.log(2);
        return done(null, false, { message: "invalid Pwd" });
      }
      console.log(3);
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
  console.log("serreialize");
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/", index);
app.use("/auth", login);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
