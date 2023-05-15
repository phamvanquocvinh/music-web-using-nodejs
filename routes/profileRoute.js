var express = require('express');
var router = express.Router();
const profileController = require('../app/controllers/profileController.js');
const auth = require('../app/controllers/authController.js');
/* GET liked songs page. */
const getProfileRouter = (app) =>{
  router.get('/', profileController.getIndex);
  router.put('/edit-profile', profileController.updateProfile)
  return app.use('/profile', auth.checkLogin, router);
}

module.exports = getProfileRouter;

