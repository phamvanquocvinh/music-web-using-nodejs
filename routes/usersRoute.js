var express = require('express');
var router = express.Router();
const usersController = require('../app/controllers/usersController.js');

/* GET liked songs page. */
const getUsersRouter = (app) =>{
  router.get('/', usersController.getIndex);
  return app.use('/users', router);
}

module.exports = getUsersRouter;

