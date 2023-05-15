const { Album } = require("../models/albumModel");
const { Song } = require("../models/songModel");

let getIndex = async (req, res)=> {
  const name = req.params.name;
  const album = await Album.find({album_name: name}).populate({
    path: 'songs_id',
    model: 'Song',
    populate: {
      path: 'artists_id',
      model: 'Artist'
    }
  }).exec();
  res.render('album-information', { title: 'Album Information', album: album });
};


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
  const playlist = await Playlist.findOne({ name: playlistName });

  // Kiểm tra nếu không tìm thấy playlist
  if (!playlist) {
    return res.status(400).json({ message: 'Playlist không tồn tại.' });
  }


  // Kiểm tra xem playlist đã tồn tại trong liked_playlists chưa
  if (user.liked_albums.includes(playlist._id)) {
    return res.status(400).json({ message: 'Playlist đã tồn tại trong danh sách yêu thích.' });
  }

  // Thêm playlist vào liked_playlists
  const user1 = await User.findByIdAndUpdate(req.session.user._id, { $push: { liked_albums: playlist._id }}, { new: true });
  user1.liked_albums.push(playlist._id);
  await user1.save();

  return res.status(200).json({ message: 'Playlist đã được thêm vào danh sách yêu thích.' });
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Lỗi server.' });
}
};


let playAllAlbum = async (req, res) => {
  try {
    const albumName = req.params.albumName;

    // Tìm album theo tên
    const album = await Album.findOne({ album_name: albumName }).populate('songs_id').exec();

    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    // Lấy danh sách các bài hát trong album
    const songs = await Song.find({ _id: { $in: album.songs_id } }).populate('artists_id');

    return res.status(200).json({ songs: songs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
    getIndex, playAll, addToLikedPlaylist, playAllAlbum,
}