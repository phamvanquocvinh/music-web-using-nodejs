const mongoose = require('mongoose');

const { Song } = require('./songModel');

const genreSchema = new mongoose.Schema({
  genre_name: { type: String },
  songs_id: [{ type: mongoose.Schema.Types.ObjectId, ref: Song }]
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = { Genre }
