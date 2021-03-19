const list = require('../controllers/list.controller.js');
const router = require('express').Router();
const jwtMiddleWare = require('../middleware/jwt.middleware');
const accessMiddleWareFactory = require('../middleware/access.middleware');
const roles = require('../constants/roles');
const {admin, editor, viewer} = roles;

module.exports = app => {
    // Create a new list
    router.post('/', accessMiddleWareFactory(admin, editor), list.add);
  
    // Retrieve all list
    router.get('/', accessMiddleWareFactory(admin, editor, viewer), list.get);

    // Retrieve by id
    router.get('/:id', accessMiddleWareFactory(admin, editor, viewer), list.getById);
  
    // Update a list with id
    router.put('/:id', accessMiddleWareFactory(admin, editor), list.update);
  
    // Go list to trash with id
    router.delete('/:id', accessMiddleWareFactory(admin, editor), list.addToTrash);
  
    // Remove list with trash by id
    router.post('/:id/recovery', accessMiddleWareFactory(admin, editor), list.removeToTrash);
 
    app.use('/api/list', jwtMiddleWare, router);
  };