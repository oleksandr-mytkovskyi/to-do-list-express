const list = require("../controllers/list.controller.js");
const router = require("express").Router();
const exjwt = require('express-jwt');

const jwtMW = exjwt({
  secret: 'my first jwt token',
  algorithms: ['HS256']
});

module.exports = app => {

    // Create a new list
    router.post("/", list.add);
  
    // Retrieve all list
    router.get("/", jwtMW, list.get);

    // Retrieve by id
    router.get("/:id", jwtMW, list.getById);
  
    // Update a list with id
    router.put("/:id", list.update);
  
    // Go list to trash with id
    router.delete("/:id", list.addToTrash);
  
    // Remove list with trash by id
    router.post("/:id/recovery", list.removeToTrash);
  
    app.use('/api/list', router);
  };