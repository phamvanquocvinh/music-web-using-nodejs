var express = require('express');
var router = express.Router();
const ratingController = require('../app/controllers/ratingController');

/* GET liked songs page. */
const getRatingRouter = (app) =>{
  router.get('/:songName', ratingController.getIndex);
  router.post('/songRate/:songName', ratingController.songRate);
  return app.use('/rating', router);
}

module.exports = getRatingRouter;

