const list = require("../controllers/list.controller.js");
const router = require("express").Router();

module.exports = app => {

    // Create a new list
    router.post("/", list.add);
  
    // Retrieve all list
    router.get("/", list.get);

    router.get("/:id", list.getById);
  
    // Update a list with id
    router.put("/:id", list.update);
  
    // Delete a list with id
    router.delete("/:id", list.delete);
  
    app.use('/api/list', router);
  };