const { Song } = require('../models/songModel');
const { User } = require('../models/userModel');
//[GET] index
let getIndex = async (req, res) =>{
    user = req.session.user;
    const song = await Song.find({ _id: { $in: user.liked_songs } });
    //res.json(song);
    res.render('liked-songs', { title: 'Liked Songs of ' + user.username, song: song });
}



let likeSong = async (req, res) => {
    const songName = req.params.songName;

    try {
      // Lấy thông tin user hiện tại
      const user = req.session.user;

      // Lấy thông tin bài hát
      const song = await Song.findOne({ song_name: songName });

      // Kiểm tra nếu bài hát đã được thích trước đó thì xoá nó khỏi mảng liked_songs trong user
      if (user.liked_songs.includes(song._id.toString())) {
        await User.findByIdAndUpdate(user._id, { $pull: { liked_songs: song._id } });
         // Cập nhật lại thông tin người dùng trong session
       const updatedUser = await User.findById(user._id);
       req.session.user = updatedUser;
        res.status(200).send('Removed from liked songs');
      } else {
        // Nếu bài hát chưa được thích trước đó thì thêm nó vào mảng liked_songs trong user
        await User.findByIdAndUpdate(user._id, { $push: { liked_songs: song._id } });
         // Cập nhật lại thông tin người dùng trong session
       const updatedUser = await User.findById(user._id);
       req.session.user = updatedUser;
          res.status(200).send('Added to liked songs');
      }
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
}; 

let PlayAllLikedSong = async (req, res) => {
  try {
    const userId = req.session.user._id;

    const user = await User.findById(userId).populate('liked_songs');

    const songIds = user.liked_songs.map(songId => songId.toString()); // chuyển song_id thành string

    const song = await Song.find({ _id: { $in: songIds } })
      .populate('artists_id').exec();

    return res.status(200).json({ song: song });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
    getIndex, likeSong, PlayAllLikedSong,
}; 

