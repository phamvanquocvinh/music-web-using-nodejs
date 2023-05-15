var express = require('express');
var router = express.Router();
const featureArtistsController = require('../app/controllers/featureArtistsController');

const getFeatureArtistsRouter = (app) =>{
  router.get('/', featureArtistsController.getIndex);
  return app.use('/feature-artists', router);
}


module.exports = getFeatureArtistsRouter;