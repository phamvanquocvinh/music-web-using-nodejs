var express = require('express');
var router = express.Router();
const lyricsController = require('../app/controllers/lyricsController.js');

/* GET liked songs page. */
const getLyricsRouter = (app) =>{
  router.get('/:songName', lyricsController.getIndex);
  return app.use('/lyrics', router);
}

module.exports = getLyricsRouter;
