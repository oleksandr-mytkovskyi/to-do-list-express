const user = require("../controllers/user.controller.js");
const router = require("express").Router();

module.exports = app => {

    // // Create a new list
    // router.post("/", list.add);
  
    router.post("/login", user.login);
    
    router.post("/reg", user.reg);

    router.post("/logout", () => {
      
      console.log('logout');
    });

    app.use('/auth', router);
  };