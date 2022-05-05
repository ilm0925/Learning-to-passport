import express from "express";
import path from "path";

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

import index from "./router/index.js";
import login from "./router/login.js";

import session from "express-session";
import sessionStore from "session-file-store";
const FileStore = sessionStore(session);

import passport from "./lib/passport.js";

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

passport(app);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", index);
app.use("/auth", login);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
