var express = require('express');
var router = express.Router();
const feedbackController = require('../app/controllers/feedbackController');

const getFeedbackRouter = (app) =>{
  router.get('/', feedbackController.getIndex);
  return app.use('/feedback', router);
}


module.exports = getFeedbackRouter;