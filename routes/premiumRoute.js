var express = require('express');
var router = express.Router();
const premiumController = require('../app/controllers/premiumController.js');

/* GET liked songs page. */
const getPremiumRouter = (app) =>{
  router.get('/', premiumController.getIndex);
  return app.use('/premium', router);
}

module.exports = getPremiumRouter;
