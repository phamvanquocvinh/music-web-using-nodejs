var express = require('express');
var router = express.Router();
const libraryController = require('../app/controllers/libraryController');
const auth = require('../app/controllers/authController');

const getLibraryRouter = (app) =>{
  router.get('/',  libraryController.getIndex);
  router.post('/create-playlist/:playlistName', libraryController.createPlaylist);
  return app.use('/library', auth.checkLogin, router);
}

module.exports = getLibraryRouter;
