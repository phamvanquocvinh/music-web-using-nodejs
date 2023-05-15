var express = require('express');
var router = express.Router();
const artistController = require('../app/controllers/artistController');

const getArtistRouter = (app) =>{
  router.get('/', artistController.getIndex);
  router.get('/:name', artistController.getArtistInfo);
  router.get('/playAllArt/:artName', artistController.playAllArt);
  return app.use('/artists', router);
}

module.exports = getArtistRouter;
