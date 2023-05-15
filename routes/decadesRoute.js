var express = require('express');
var router = express.Router();
const decadesController = require('../app/controllers/decadesController');

const getDecadesRouter = (app) =>{
  router.get('/', decadesController.getIndex);
  return app.use('/decades', router);
}

module.exports = getDecadesRouter;
