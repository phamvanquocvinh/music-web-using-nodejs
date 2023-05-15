var express = require('express');
var router = express.Router();
const landingController = require('../app/controllers/landingController');

const getLandingRouter = (app) =>{
  router.get('/', landingController.getIndex);
  return app.use('/landing', router);
}

module.exports = getLandingRouter;
