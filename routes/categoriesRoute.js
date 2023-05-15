var express = require('express');
var router = express.Router();
const categoriesController = require('../app/controllers/categoriesController');

const getCategoriesRouter = (app) =>{
  router.get('/', categoriesController.getIndex);
  router.get('/:genrename', categoriesController.getSpecificGenre);
  return app.use('/categories', router);
}

module.exports = getCategoriesRouter;
