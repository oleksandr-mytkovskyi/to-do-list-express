const user = require("../controllers/user.controller.js");
const router = require("express").Router();

module.exports = app => {

    // // Create a new list
    // router.post("/", list.add);
  
    router.post("/login", user.login);
    
    router.post("/reg", user.reg);

    router.post("/logout", () => {console.log('logout')});
    
    // // Retrieve by id
    // router.get("/:id", list.getById);
  
    // // Update a list with id
    // router.put("/:id", list.update);
  
    // // Go list to trash with id
    // router.delete("/:id", list.addToTrash);
  
    // // Remove list with trash by id
    // router.post("/:id/recovery", list.removeToTrash);
  
    app.use('/auth', router);
  };