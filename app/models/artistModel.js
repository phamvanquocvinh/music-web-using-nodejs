const mongoose = require('mongoose');
const { Album } = require('./albumModel');
const { Song } = require('./songModel')

const artistSchema = new mongoose.Schema({
  artist_name: { type: String },
  artist_img: { type: String },
  monthly_listeners: { type: Number },
  songs_id: [{ type: mongoose.Schema.Types.ObjectId, ref: Song }],
  albums_id: [{ type: mongoose.Schema.Types.ObjectId, ref: Album }]  
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = { Artist }
