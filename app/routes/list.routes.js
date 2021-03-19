const list = require('../controllers/list.controller.js');
const router = require('express').Router();
const MW = require('../middleware/jwt.middleware');
const MW2 = require('../middleware/access.middleware');
const roles = require('../constants/roles');
const {admin, editor, viewer} = roles;

module.exports = app => {
    // Create a new list
    router.post('/', MW2.accessMiddleWareFactory(admin, editor), list.add);
  
    // Retrieve all list
    router.get('/', MW2.accessMiddleWareFactory(admin, editor, viewer), list.get);

    // Retrieve by id
    router.get('/:id', MW2.accessMiddleWareFactory(admin, editor, viewer), list.getById);
  
    // Update a list with id
    router.put('/:id', MW2.accessMiddleWareFactory(admin, editor), list.update);
  
    // Go list to trash with id
    router.delete('/:id', MW2.accessMiddleWareFactory(admin, editor), list.addToTrash);
  
    // Remove list with trash by id
    router.post('/:id/recovery', MW2.accessMiddleWareFactory(admin, editor), list.removeToTrash);
 
    app.use('/api/list', MW.jwtMiddleWare, router);
  };