const {Song} = require('../models/songModel')
const { Comment } = require('../models/commentModel');
const mongoose = require('mongoose');

let getIndex = async (req, res) => {
    const songName = req.params.songName;
    
    const song = await Song.find({song_name: songName}).populate({
        path: 'comment_id',
        model: 'Comment',
        populate: {
            path: 'user_id',
            model: 'User'
        }
    }).populate({
        path: 'artists_id',
        model: 'Artist'
    })
    
    res.render('comment', { title: `${songName}` , song: song});
}
let addComment = async (req, res) => {
    const songName = req.params.songName;
    const userId = req.session.user._id;
    const message = req.body.message;
  
    try {
      // Tìm bài hát dựa trên tên
      const song = await Song.findOne({ song_name: songName });
  
      if (!song) {
        return res.status(404).send('Song not found');
      }
  
      // Tạo comment mới
      const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        song_name: songName,
        user_id: userId,
        message: message,
        day_created: new Date()
      });
  
      // Lưu comment vào database
      await comment.save();
  
      // Cập nhật songModel với comment mới
      song.comment_id.push(comment._id);
      await song.save();
  
      return res.redirect(`/comment/${songName}`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Server error');
    }
  };
module.exports = {
    getIndex, addComment,
}

