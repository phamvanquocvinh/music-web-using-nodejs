const { User } = require("../models/userModel");
const { Playlist } = require("../models/playlistModel");
const mongoose = require('mongoose');

let getIndex = async (req, res) => {
    const user = await User.findById({_id: req.session.user._id}).populate({
        path: 'created_playlists',
        model: 'Playlist',
    }).populate({
        path: 'liked_playlists',
        model: 'Playlist',
    }).exec();
    res.render('library', { title: 'Library', user: user });
}
let createPlaylist = async (req, res) => {
    try {
      const playlist_name = req.params.playlistName;
      const playlist = new Playlist({
        _id: mongoose.Types.ObjectId(),
        playlist_name: playlist_name,
        playlist_img: 'https://picsum.photos/300/300',
        username: req.session.user.username,
      });
        await playlist.save();
        await User.updateOne(
            { username: req.session.user.username },
            { $push: { created_playlists: playlist._id } }
        );
      return res.status(201).json({ message: 'Tạo playlist thành công!' });
    } catch (error) {
      return res.status(500).json({ message: 'Lỗi server!' });
    }
  };

module.exports = {
    getIndex, createPlaylist,
}