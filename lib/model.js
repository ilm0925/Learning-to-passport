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
  //     id : db.Topic.length
  //   },
  Create: (info) => {
    // obj받아와서 id property추가 후 푸쉬
    info.id = db.Topic.length + 1;
    db.Topic.push(info);
  },
  getPost: (id) => {
    return db.Topic.find((post) => post.id == id);
  },

  AllPost: () => {
    return db.Topic;
  },
};
