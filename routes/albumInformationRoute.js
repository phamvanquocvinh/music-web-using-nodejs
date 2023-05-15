var express = require('express');
var router = express.Router();
const albumInformationController = require('../app/controllers/albumInformationController.js');
const indexController = require('../app/controllers/indexController');
const likeSongController = require('../app/controllers/likedSongsController');
const authController = require('../app/controllers/authController');

const getAlbumInformationRouter = (app) =>{
  router.get('/:name', albumInformationController.getIndex);
  router.get('/playAll/:playlistName', albumInformationController.playAll);
  router.get('/songplay/:songName', indexController.songplay);
  router.post('/add-to-liked-playlist/:playlistName', albumInformationController.addToLikedPlaylist);
  router.post('/likeSong/:songName', authController.checkLogin, likeSongController.likeSong);
  router.get('/download/:songName', authController.checkLogin, indexController.songDownload)
  router.get('/playAllAlbum/:albumName', albumInformationController.playAllAlbum);
  router.post('/add-to-playlist/:playlistName', authController.checkLogin, indexController.addToPlayList);
  return app.use('/album-information', router);
}


module.exports = getAlbumInformationRouter;
