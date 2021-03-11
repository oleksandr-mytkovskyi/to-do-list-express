const list = require("../controllers/list.controller.js");
const router = require("express").Router();

module.exports = app => {

    // Create a new list
    router.post("/", list.add);
  
    // Retrieve all list
    router.get("/", list.get);

    // Retrieve by id
    router.get("/:id", list.getById);
  
    // Update a list with id
    router.put("/:id", list.update);
  
    // Go list to trash with id
    router.delete("/:id", list.delete);
  
    // Remove list with trash by id
    router.post("/:id/recovery", list.removeToTrash);
  
    app.use('/api/list', router);
  };