const user = require('../controllers/user.controller.js');
const router = require('express').Router();
const schema = require('../validators/user.validator');
const {userSchemaReg, userSchemaLogin} = schema;
const userValidationMiddleware = require('../middleware/userValidation.middleware');

module.exports = app => {

    router.post('/login', userValidationMiddleware(userSchemaLogin), user.login);
    
    router.post('/reg', userValidationMiddleware(userSchemaReg), user.reg);

    router.post('/refresh', user.refresh);

    app.use('/auth', router);
  };