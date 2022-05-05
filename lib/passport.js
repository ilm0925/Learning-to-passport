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
        const user = model.FindOne(id);
        if (user && user.PWD == pwd) {
          console.log("Login Success");
          return done(null, user);
        }
        console.log("invalid Userinfo");
        return done(null, false);
      }
    )
  );
  passport.serializeUser(function (user, done) {
    console.log(`Serialize`);
    done(null, user.ID);
  });

  passport.deserializeUser(function (ID, done) {
    const user = model.FindOne(ID);
    done(null, user);
  });
};
