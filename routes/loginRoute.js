var express = require('express');
var router = express.Router();
const loginController = require('../app/controllers/loginController');

const getLoginRouter = (app) =>{
  router.get('/', loginController.login);
  router.post('/', loginController.loginPost);
  return app.use('/login', router);
}

module.exports = getLoginRouter;


