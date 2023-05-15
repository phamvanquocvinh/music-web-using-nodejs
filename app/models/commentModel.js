const mongoose = require('mongoose');
const { Song } = require('./songModel');
const { User } = require('./userModel');

const commentSchema = new mongoose.Schema({
  song_name: String ,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: User },
  message: { type: String },
  day_created: { type: Date },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = { Comment }
