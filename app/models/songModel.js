const mongoose = require('mongoose');
const { Artist } = require('../models/artistModel');
const { Playlist } = require('./playlistModel');
const { Comment } = require('./commentModel')

const songSchema = new mongoose.Schema({
  song_name: { type: String },
  song_path: { type: String },
  song_img: { type: String },
  song_lyric: { type: String },
  song_duration: { type: String },
  song_rating_star_total: { type: Number },
  artists_id: [{ type: mongoose.Schema.Types.ObjectId, ref: Artist }],
  playlists_id: [{ type: mongoose.Schema.Types.ObjectId, ref: Playlist }],
  comment_id: [{ type: mongoose.Schema.Types.ObjectId, ref: Comment }],
  genre_name: { type: String }
});

const Song = mongoose.model('Song', songSchema);

module.exports = { Song }

