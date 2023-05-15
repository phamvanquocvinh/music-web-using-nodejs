var express = require('express');
var router = express.Router();
const artistInformationController = require('../app/controllers/cookieWarningController');

const getCookieWarningRouter = (app) =>{
  router.get('/', artistInformationController.getIndex);
  return app.use('/cookie-warning', router);
}


module.exports = getCookieWarningRouter;
