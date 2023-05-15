var express = require('express');
var router = express.Router();
const adminController = require('../app/controllers/adminController.js');
const auth = require('../app/controllers/authController.js');

const getAdminRouter = (app) =>{
  router.get('/', adminController.getIndex);
  router.post('/add-song', adminController.addNewSong);
  router.post('/add-artist', adminController.addNewArtist);
  router.post('/add-playlist', adminController.addNewPlaylist);
  router.post('/add-album', adminController.addNewAlbum);
  router.post('/add-user', adminController.addNewUser);
  router.post('/add-comment', adminController.addNewComment);
  router.put('/edit-song', adminController.editSong);
  router.put('/edit-comment', adminController.editComment);
  router.delete('/delete-song/:id', adminController.deleteSong);
  router.delete('/delete-comment/:id', adminController.deleteComment);
  router.get('/song/:id', adminController.getSongData);
  router.get('/comment/:id', adminController.getCommentData);
  return app.use('/admin', auth.checkAdmin, router);
}


module.exports = getAdminRouter;
