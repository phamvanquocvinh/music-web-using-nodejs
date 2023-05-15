var express = require('express');
var router = express.Router();
const advertisementController = require('../app/controllers/advertisementController');

const getAdvertisementRouter = (app) =>{
  router.get('/', advertisementController.getIndex);
  return app.use('/advertisement', router);
}


module.exports = getAdvertisementRouter;

