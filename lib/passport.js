import passport from "passport";
import { Strategy } from "passport-local";
import model from "./model.js";

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

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
  passport.serializeUser(function (user, done) {
    done(null, user.name);
  });

  passport.deserializeUser(function (name, done) {
    console.log(`deserial ${name}`);
    done(null, name);
  });
};
