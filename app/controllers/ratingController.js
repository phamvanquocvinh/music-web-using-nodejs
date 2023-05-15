const {Song} = require('../models/songModel')

let getIndex = async (req, res)=> {
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
    
    res.render('rating', { title: `${songName}` , song: song});
  };

  let songRate = async (req, res) => {
    const { songName } = req.params;
    const { rating } = req.body;
  
    try {
      // Tìm kiếm bài hát theo tên
      const song = await Song.findOne({ song_name: songName });
  
      // Nếu không tìm thấy bài hát
      if (!song) {
        return res.status(404).json({ message: "Song not found" });
      }
  
      // Cập nhật số sao của bài hát
      song.song_rating_star_total = rating;
  
      // Lưu bài hát mới vào database
      const updatedSong = await song.save();
  
      // Trả về thông tin bài hát đã được cập nhật
      return res.status(200).json(updatedSong);
    } catch (error) {
      // Xử lý lỗi và trả về thông báo lỗi
      return res.status(500).json({ message: error.message });
    }
  };
  
  
  module.exports = {
      getIndex, songRate,
  }
