import express from "express";
import ejs from "ejs";
import path from "path";

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

import index from "./router/index.js";
import login from "./router/login.js";

import session from "express-session";
import sessionStore from "session-file-store";
const FileStore = sessionStore(session);

import passport from "passport";
import { Strategy } from "passport-local";
import { stringify } from "querystring";

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: "sknfienf123",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);
app.use(passport.initialize());
app.use(passport.session());

const userInfo = {
  name: "Egoing",
  id: "Egoing123",
  pwd: "12345",
};

passport.serializeUser(function (user, done) {
  done(null, user.name);
});

passport.deserializeUser(function (name, done) {
  console.log(`deserial ${name}`);
  done(null, name);
});

passport.use(
  new Strategy(
    {
      usernameField: "id",
      passwordField: "pwd",
    },
    (id, pwd, done) => {
      if (id != userInfo.id) {
        console.log(1);
        return done(null, false, { message: "invalid ID" });
      } else if (pwd != userInfo.pwd) {
        console.log(2);
        return done(null, false, { message: "invalid Pwd" });
      }
      console.log("Login Success");
      return done(null, userInfo);
    }
  )
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/", index);
app.use("/auth", login);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
