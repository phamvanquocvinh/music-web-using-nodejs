const mongoose = require('mongoose');
const { Song } = require('./songModel');

const albumSchema = new mongoose.Schema({
  album_name: { type: String },
  album_img: { type: String },
  artist_name: { type: String },
  songs_id: [{type: mongoose.Schema.Types.ObjectId, ref: Song}]
});

const Album = mongoose.model('Album', albumSchema);

module.exports = { Album }