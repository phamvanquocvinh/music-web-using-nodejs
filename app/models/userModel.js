const mongoose = require('mongoose');
const { Album } = require('./albumModel');
const { Playlist } = require('./playlistModel');
const { Song } = require('./songModel');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  user_fullname: { type: String, required: true },
  user_email: { type: String, required: true, unique: true },
  user_password: { type: String, required: true },
  user_img: { type: String, default: '/img/default.png' },
  user_type: { type: String, default: 'user'},
  premium: { type: Boolean, default : false },
  liked_songs: [{ type: mongoose.Schema.Types.ObjectId, ref: Song, default: [] }],
  created_playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: Playlist, default: [] }],
  liked_playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: Album, default: [] }],
});

const User = mongoose.model('User', userSchema);
module.exports = { User }
