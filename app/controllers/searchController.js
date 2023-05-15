const { Song } = require('../models/songModel');
const { Artist } = require('../models/artistModel');
const { Album } = require('../models/albumModel');
//[GET] index
let getIndex = (req, res) =>{
    res.render('search', { title: 'Search' });
}
let search = async (req, res) => {
    try {
        //const terms = req.data.term; // lấy từ khóa tìm kiếm từ request
        //console.log(terms);
        const term = req.query.q;
        const songs = await Song.find({ song_name: { $regex: term, $options: 'i' } }).populate('artists_id');
        const albums = await Album.find({ album_name: { $regex: term, $options: 'i' } }).exec();
        const artists = await Artist.find({ artist_name: { $regex: term, $options: 'i' } }).exec(); // tìm các nghệ sĩ có tên chứa từ khóa tìm kiếm
        //return res.status(200).json({ songs: songs, artists: artists }); // trả về kết quả tìm kiếm
        res.render('search', { songs: songs, artists: artists, albums: albums, }); // trả về kết quả tìm kiếm
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getIndex, search,
}; 

