import db from "../db/index.js";

//FindOne(obj)
//

export default {
  FindOne: (ID) => {
    //id로 유저를 찾음
    return db.User.find((user) => user.ID == ID);
  },
  SignUp: (info) => {
    //검사하고 푸쉬
    db.User.push(info);
  },

  AllUser: () => {
    // 테스트용
    db.User.map((user) => {
      console.log(user);
    });
  },

  //   {
  //     Title: "What is Node js?...",
  //     Desc: "Node js is .....",
  //     Writer: "zeta1232",
  //     id : 1
  //   },
  Create: (info) => {
    // obj받아와서 바로 푸쉬
    db.Topic.push(info);
  },
};
