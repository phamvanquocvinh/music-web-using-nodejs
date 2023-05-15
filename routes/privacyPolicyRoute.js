var express = require('express');
var router = express.Router();
const privacyPolicyController = require('../app/controllers/privacyPolicyController');

const getPrivacyPolicyRouter = (app) =>{
  router.get('/', privacyPolicyController.getIndex);
  return app.use('/privacy-policy', router);
}


module.exports = getPrivacyPolicyRouter;