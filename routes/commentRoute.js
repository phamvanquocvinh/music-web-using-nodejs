var express = require('express');
var router = express.Router();
const commentController = require('../app/controllers/commentController');

const getCommentRouter = (app) =>{
  const bodyParser = require('body-parser');
  router.use(bodyParser.urlencoded({ extended: true }));
  router.get('/:songName', commentController.getIndex);
  router.post('/addComment/:songName', commentController.addComment);
  return app.use('/comment', router);
}

module.exports = getCommentRouter;

