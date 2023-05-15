var express = require('express');
var router = express.Router();
const timeController = require('../app/controllers/timeController');

const getTimeRouter = (app) =>{
  router.get('/', timeController.getIndex);
  return app.use('/time-is', router);
}

module.exports = getTimeRouter;
