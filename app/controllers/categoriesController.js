const { Genre } = require("../models/genreModel");

let getIndex = async (req, res) =>{
    const genre = await Genre.find().exec();
    res.render('categories', { title: 'Categories', genre: genre });
}
let getSpecificGenre = async (req, res) =>{
    const name = req.params.genrename;
    const genre = await Genre.find({genre_name: name}).populate({
        path: 'songs_id',
        model: 'Song',
        populate: {
            path: 'artists_id',
            model: 'Artist'
        }
    }).exec()
    res.render('categories-list', { title: 'Categories List', genre: genre });
}
module.exports = {
    getIndex, getSpecificGenre
}