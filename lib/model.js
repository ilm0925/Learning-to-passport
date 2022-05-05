import db from "../db/index.js";

//FindOne(obj)
//

export default {
  FindOne: (ID) => {
    return db.User.find((user) => user.ID == ID);
  },
  SignUp: (info) => {
    db.User.push(info);
  },

  AllUser: () => {
    db.User.map((user) => {
      console.log(user);
    });
  },
};
