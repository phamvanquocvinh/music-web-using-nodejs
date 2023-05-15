const { Artist } = require("../models/artistModel");
const { Song } = require("../models/songModel");

let getIndex = async (req, res)=>{
    const artist = await Artist.find().exec()
    res.render('artists', { title: 'Artists', artist: artist });
}
let getArtistInfo = async (req, res) =>{
    const name = req.params.name;
    const artist = await Artist.find({artist_name: name}).populate({
        path: 'songs_id',
        model: 'Song',
        populate: {
            path: 'artists_id',
            model: 'Artist'
        }
    }).populate({
        path: 'albums_id',
        model: 'Album'
    }).exec();
    res.render('artist-information', { title: 'Artist Information', artist: artist });
}
let playAllArt = async (req, res) => {
    try {
      const artistName = req.params.artName;
  
      const songs = await Artist.findOne({ artist_name: artistName })
        .populate({
          path: 'songs_id',
          model: 'Song',
          populate: {
            path: 'artists_id',
            model: 'Artist',
          },
        })
        .exec();
  
      if (!songs) {
        return res.status(404).json({ message: 'Songs not found' });
      }
  
      return res.status(200).json({ songs: songs.songs_id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  


module.exports = {
    getIndex, getArtistInfo, playAllArt,
}