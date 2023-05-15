var express = require('express');
var router = express.Router();
const indexController = require('../app/controllers/indexController');
const likeSongController = require('../app/controllers/likedSongsController');
const authController = require('../app/controllers/authController');
const libraryController = require('../app/controllers/libraryController');

const getIndexRouter = (app) =>{
  router.get('/', indexController.getIndex);
  router.get('/logout', indexController.logout);
  router.get('/songplay/:songName', indexController.songplay);
  router.get('/getTop10/:playlistName', indexController.getTop10);
  router.get('/getSongListByGenre/:songName', indexController.getSongListByGenre);
  router.post('/create-playlist/:playlistName', libraryController.createPlaylist);
  router.post('/likeSong/:songName', authController.checkLogin, likeSongController.likeSong);
  router.get('/download/:songName', authController.checkLogin, indexController.songDownload)
  router.post('/add-to-playlist/:playlistName', authController.checkLogin, indexController.addToPlayList);
  return app.use('/', router);
}

module.exports = getIndexRouter;

