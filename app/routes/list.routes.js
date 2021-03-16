const list = require("../controllers/list.controller.js");
const router = require("express").Router();
const MW = require('../middleware/jwt.middleware');
const MW2 = require('../middleware/access.middleware');
// const accessMiddleWare = require('../middleware/access.middleware');

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
    router.delete("/:id", list.addToTrash);
  
    // Remove list with trash by id
    router.post("/:id/recovery", list.removeToTrash);
  
    app.use('/api/list', MW.jwtMiddleWare, MW2.accessMiddleWare, router);
  };