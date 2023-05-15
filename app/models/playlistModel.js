const mongoose = require('mongoose');
const { Song } = require('./songModel');

const playlistSchema = new mongoose.Schema({
  playlist_name: { type: String },
  playlist_img: { type: String },
  username: { type: String },
  songs_id: [{ type: mongoose.Schema.Types.ObjectId, ref: Song }],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = { Playlist }
