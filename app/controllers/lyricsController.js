const {Song} = require('../models/songModel')


//[GET] index
let getIndex = async (req, res) =>{
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
    
    res.render('lyrics', { title: `${songName}` , song: song});
}

module.exports = {
    getIndex,
}; 

