const { Playlist } = require("../models/playlistModel");
const { Song } = require("../models/songModel");
const { User } = require("../models/userModel");

//[GET] index
let getIndex = async (req, res) =>{
    const name = req.params.name;
    let admin = false;
    const playlist = await Playlist.find({playlist_name: name}).populate({
        path: 'songs_id',
        model: 'Song',
        populate:{
            path: 'artists_id',
            model: 'Artist'
        }
    }).exec();
    if(playlist[0].username == 'Paradise')
    {
      admin = true;
    }
    res.render('playlist-information', { title: 'Playlist Information', playlist: playlist, admin: admin });
}

let playAll = async (req, res) => {
    try {
        const playlistName = req.params.playlistName;
        // Tìm playlist theo ten
        const playlist = await Playlist.findOne({ playlist_name: playlistName }).populate('songs_id').exec();
        //const playlist = await Playlist.findById(playlistId);
    
        if (!playlist) {
          return res.status(404).json({ message: 'Playlist not found' });
        }
    
        // Lấy danh sách các bài hát trong playlist
        const songs = await Song.find({ _id: { $in: playlist.songs_id } }).populate('artists_id');
        return res.status(200).json({ songs: songs });
        
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
};

let addToLikedPlaylist = async (req, res) => {
  try {
    const playlistName = req.params.playlistName;
    const user = req.session.user;

    // Tìm playlist trong cơ sở dữ liệu dựa trên playlistName
    const playlist = await Playlist.findOne({ playlist_name: playlistName });

    // Kiểm tra nếu không tìm thấy playlist
    if (!playlist) {
      return res.status(400).json({ message: 'Playlist không tồn tại.' });
    }


    // Kiểm tra xem playlist đã tồn tại trong liked_playlists chưa
    if (user.liked_playlists.includes(playlist._id)) {
      return res.status(400).json({ message: 'Playlist đã tồn tại trong danh sách yêu thích.' });
    }

    // Thêm playlist vào liked_playlists
    const user1 = await User.findByIdAndUpdate(req.session.user._id, { $push: { liked_playlists: playlist._id }}, { new: true });
    user1.liked_playlists.push(playlist._id);
    await user1.save();

    return res.status(200).json({ message: 'Playlist đã được thêm vào danh sách yêu thích.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server.' });
  }
};
let deleteSongFromPlaylist = async (req, res) => {
  try {
    const { playlistName, songName } = req.params;
    const songDelete = await Song.findOne({ song_name: songName });
    const playlist = await Playlist.findOne({ playlist_name: playlistName });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    // Check if the song is in the playlist
    const index = playlist.songs_id.indexOf(songDelete._id);
    if (index === -1) {
      return res.status(404).json({ message: 'Song not found in playlist' });
    }

    // Remove the song from the playlist
    playlist.songs_id.splice(index, 1);
    await playlist.save();

    return res.status(200).json({ message: 'Song deleted from playlist' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
    getIndex, playAll, addToLikedPlaylist, deleteSongFromPlaylist,
}; 

