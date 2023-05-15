var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const registerController = require('../app/controllers/registerController.js');

/* GET liked songs page. */
const getRegisterRouter = (app) =>{
  router.get('/', registerController.getIndex);
  router.post('/', bodyParser.json(), registerController.register);
  return app.use('/register', router);
}

module.exports = getRegisterRouter;

