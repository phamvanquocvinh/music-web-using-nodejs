const { Album } = require('../models/albumModel');
const { Artist } = require('../models/artistModel');
const { Playlist } = require('../models/playlistModel');
const { Song } = require('../models/songModel');
const { Genre } = require('../models/genreModel');
const path = require('path');
const fs = require('fs');
const { User } = require('../models/userModel');

let getIndex = async (req, res) => {
    const confidence = await Playlist.findOne({ playlist_name: 'Confidence Boost' }).populate({
        path: 'songs_id',
        model: 'Song',
        populate: {
            path: 'artists_id',
            model: 'Artist',
        }
    }).exec();
    const sensual = await Playlist.findOne({ playlist_name: 'Sensual Lounge' }).populate({
        path: 'songs_id',
        model: 'Song',
        populate: {
            path: 'artists_id',
            model: 'Artist',
        }
    }).exec();
    const sadness = await Playlist.findOne({ playlist_name: 'Sadness' }).populate({
        path: 'songs_id',
        model: 'Song',
        populate: {
            path: 'artists_id',
            model: 'Artist',
        }
    }).exec();
    const fresh = await Playlist.findOne({ playlist_name: 'Fresh Finds' }).populate({
        path: 'songs_id',
        model: 'Song',
        populate: {
            path: 'artists_id',
            model: 'Artist',
        }
    }).exec();
    const colors = await Playlist.findOne({ playlist_name: 'Colors Show' }).populate({
        path: 'songs_id',
        model: 'Song',
        populate: {
            path: 'artists_id',
            model: 'Artist',
        }
    }).exec();
    const redmoon = await Playlist.findOne({ playlist_name: 'Red Moon In Venus' }).populate({
        path: 'songs_id',
        model: 'Song',
        populate: {
            path: 'artists_id',
            model: 'Artist',
        }
    }).exec();
    const psytrance = await Playlist.findOne({ playlist_name: 'Psytrance Supernova' }).populate({
        path: 'songs_id',
        model: 'Song',
        populate: {
            path: 'artists_id',
            model: 'Artist',
        }
    }).exec();
    const top10 = await Playlist.findOne({ playlist_name: 'Top 10' }).populate({
        path: 'songs_id',
        model: 'Song',
        limit: 5,
        populate: {
            path: 'artists_id',
            model: 'Artist',
        }
    }).exec();
    const categories = await Genre.aggregate([{$sample:{size:6}}]).exec();
    const loveartist = await Artist.aggregate([{$sample:{size:6}}]).exec();
    const ftartist = await Artist.find().sort({monthly_listeners: -1}).limit(5).exec();
    const albumweek = await Album.find().limit(5).exec();
    let user = "";
    if(req.session.user){
         user = await User.findById({_id: req.session.user._id}).populate({
            path: 'created_playlists',
            model: 'Playlist',
        }).exec();
        console.log(user);
    }

    const albums = await Album.find().limit(6).exec();
    const playlists = await Playlist.aggregate([{$sample:{size:6}}]).exec();
    const newsong = await Playlist.findOne({ playlist_name: 'New Track Releases' }).populate({
        path: 'songs_id',
        model: 'Song',
        populate: {
            path: 'artists_id',
            model: 'Artist',
        }
    }).exec();
    res.render('index', { title: 'Homepage', user: user, newsong: newsong, playlists: playlists, albums: albums, confidence: confidence, sensual: sensual, sadness: sadness, fresh: fresh, colors: colors, redmoon: redmoon,psytrance: psytrance, top10: top10, albumweek: albumweek, ftartist: ftartist, loveartist: loveartist, categories: categories});
}

let logout = (req, res) => {
    req.session.isLoggedIn = false;
    req.session.user = false;
    res.redirect('/login');
}
let songplay = async (req, res) => {
    try {
      const songName = req.params.songName;
      const song = await Song.findOne({ song_name: songName }).populate('artists_id');
      console.log(req.session.user)
      user = req.session.user;
        res.json({ song: song, user: req.session.user });
        res.render('song', { song: song });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  let songDownload = async (req, res) => {
    const songName = req.params.songName;
    const filePaths = path.resolve(__dirname, '..', 'public', 'song_mp3', `${songName}.mp3`);
    const filePath = filePaths.replace("app", "");
    res.download(filePath);
  };

  let addToPlayList = async (req, res) => {
    try {
      const playlistName = req.params.playlistName;
      const songId = req.body.songName;
      console.log(playlistName)
      
  
      // Tìm kiếm playlist theo tên
      const playlist = await Playlist.findOne({ playlist_name: playlistName }).exec();
  
      // Nếu không tìm thấy playlist, trả về lỗi
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
  
      // Kiểm tra xem bài hát đã tồn tại trong playlist hay chưa
      if (playlist.songs_id.includes(songId)) {
        return res.status(400).json({ message: 'Song already exists in playlist' });
      }
  
      // Thêm bài hát vào playlist
      playlist.songs_id.push(songId);
      await playlist.save();
  
      return res.status(200).json({ message: 'Song added to playlist' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  let toggleDarkMode = async (req, res) => {
    const isDarkMode = req.body.isDarkMode;
  
    req.session.isDarkMode = isDarkMode;
  
    res.status(200).json({ message: 'Dark mode updated successfully' });
  };
  
let getTop10 = async (req, res) => {
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

let getSongListByGenre = async (req, res) => {
  try {
    const songName = req.params.songName;

    // Tìm bài hát trong cơ sở dữ liệu
    const song = await Song.findOne({ song_name: songName });

    // Nếu không tìm thấy bài hát, trả về lỗi
    if (!song) {
      return res.status(404).json({ message: 'Không tìm thấy bài hát.' });
    }

    // Lấy genreName của bài hát
    const genreName = song.genre_name;

    // Tìm các bài hát trong genre
    const songs = await Song.find({ genre_name: genreName });

    // Trả về danh sách bài hát
    return res.status(200).json({ songs });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server.' });
  }
};


  
module.exports = {
    getIndex, logout, songplay, songDownload, addToPlayList, toggleDarkMode, getTop10, getSongListByGenre 
}   
