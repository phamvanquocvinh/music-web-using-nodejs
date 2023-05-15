var express = require('express');
var router = express.Router();
const searchController = require('../app/controllers/searchController.js');

/* GET liked songs page. */
const getSearchRouter = (app) =>{
  router.get('/', searchController.getIndex);
  router.get('/searchKey', searchController.search);
  return app.use('/search', router);
}

module.exports = getSearchRouter;

