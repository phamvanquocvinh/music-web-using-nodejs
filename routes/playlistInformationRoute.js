var express = require('express');
var router = express.Router();
const playlistInformationController = require('../app/controllers/playlistInformationController.js');
const indexController = require('../app/controllers/indexController');
const likeSongController = require('../app/controllers/likedSongsController');
const authController = require('../app/controllers/authController');

/* GET liked songs page. */
const getPlaylistInformationRouter = (app) =>{
  router.get('/:name', playlistInformationController.getIndex);
  router.get('/playAll/:playlistName', playlistInformationController.playAll);
  router.get('/songplay/:songName', indexController.songplay);
  router.post('/add-to-liked-playlist/:playlistName',authController.checkLogin, playlistInformationController.addToLikedPlaylist);
  router.post('/likeSong/:songName', authController.checkLogin, likeSongController.likeSong);
  router.get('/download/:songName', authController.checkLogin, indexController.songDownload)
  router.post('/add-to-playlist/:playlistName', authController.checkLogin, indexController.addToPlayList);
  router.delete('/delete-song-from-playlist/:playlistName/song/:songName', playlistInformationController.deleteSongFromPlaylist);
  return app.use('/playlist-information', router);
}

module.exports = getPlaylistInformationRouter;
 