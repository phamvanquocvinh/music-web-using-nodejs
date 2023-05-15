var express = require('express');
var router = express.Router();
const aboutUsController = require('../app/controllers/aboutUsController');

const getAboutUsRouter = (app) =>{
  router.get('/', aboutUsController.getIndex);
  return app.use('/aboutUs', router);
}

module.exports = getAboutUsRouter;