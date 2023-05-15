var express = require('express');
var router = express.Router();
const likedSongsController = require('../app/controllers/likedSongsController.js');
const auth = require('../app/controllers/authController.js');

/* GET liked songs page. */
const getLikedSongsRouter = (app) =>{
  router.get('/', likedSongsController.getIndex);
  router.get('/playAllLikedSong', likedSongsController.PlayAllLikedSong);
  return app.use('/liked-songs', auth.checkLogin, router);
}

module.exports = getLikedSongsRouter;
