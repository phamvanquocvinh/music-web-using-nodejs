const { Artist } = require("../models/artistModel");
const { Genre } = require("../models/genreModel");
const { Song } = require("../models/songModel");
const fs = require('fs');
const path = require('path');
const { User } = require("../models/userModel");
const { Comment } = require("../models/commentModel");
const { Album } = require("../models/albumModel");
const { Playlist } = require("../models/playlistModel");


let getIndex = async (req, res) =>{
    const playlists = await Playlist.find().populate({
      path: 'songs_id',
      model : 'Song'
    }).exec();
    const albums = await Album.find().populate({
      path: 'songs_id',
      model: 'Song'
    }).exec()
    const genre = await Genre.find().populate({
      path: 'songs_id',
      model: 'Song'
    }).exec()
    const artists = await Artist.find().populate({
      path: 'songs_id',
      model: 'Song'
    }).populate({
      path: 'albums_id',
      model: 'Album'
    }).exec();
    const songs = await Song.find().populate({
        path: 'artists_id',
        model: 'Artist'
    }).exec();
    const users = await User.find().exec();
    const comments = await Comment.find().populate({
      path: 'user_id',
      model: 'User'
    }).exec();
    res.render('admin', { title: 'Admin', songs : songs, artists: artists, genre: genre, users: users, comments: comments, albums: albums, playlists: playlists });
};

let addNewSong = async (req, res) =>{
  const artists_name = req.body.artists_name;

  // Store song file
  const songFile = req.files.song_path;
  const songFilePath = 'public/song_mp3/' + songFile.name;
  songFile.mv(songFilePath, function(err) {
    if (err) {
      res.status(500).send({ error: err });
      return;
    }

    // Store song image file
    const songImageFile = req.files.song_img;
    const songImageFilePath = 'public/img/db_img/song_img/' + songImageFile.name;
    songImageFile.mv(songImageFilePath, function(err) {
      if (err) {
        res.status(500).send({ error: err });
        return;
      }

      // Store song lyrics file
      const songLyricsFile = req.files.song_lyric;
      const songLyricsFilePath = 'public/song_lyrics/' + songLyricsFile.name;
      songLyricsFile.mv(songLyricsFilePath, function(err) {
        if (err) {
          res.status(500).send({ error: err });
          return;
        }

        // Create new Song document
        const song = new Song({
          song_name: req.body.song_name,
          artists_id: artists_name,
          genre_name: req.body.genre_name,
          song_path: '/song_mp3/' + songFile.name,
          song_img: '/img/db_img/song_img/' + songImageFile.name,
          song_lyric: '/song_lyrics/' + songLyricsFile.name,
          song_duration: req.body.song_duration,
          song_rating_star_total: req.body.song_rating
        });

        // Save Song document to database
        song.save(function(err, song) {
          if (err) {
            res.status(500).send({ error: err });
          } else {
            res.redirect('/admin');
          }
        });
      });
    });
  });
};

let addNewArtist = async (req, res) =>{
  const songs_name = req.body.songs_name;
  const albums_name = req.body.albums_name;

  const artistFile = req.files.artist_img;
  const artistFilePath = 'public/img/db_img/artist_img/' + artistFile.name;
  artistFile.mv(artistFilePath, function(err) {
    if (err) {
      res.status(500).send({ error: err });
      return;
    }

    const artist = new Artist({
      artist_name: req.body.artist_name,
      artist_img: '/img/db_img/artist_img/' + artistFile.name,
      monthly_listeners: req.body.monthly_listeners,
      songs_id: songs_name,
      albums_id: albums_name,
    });

    artist.save(function(err, artist){
      if(err){
        res.status(500).send({ error: err });
      }
      else{
        res.redirect('/admin');
      }
    });
  });
};  

let addNewPlaylist = async (req, res) =>{
  const songs_name = req.body.songs_name;

  const playlistFile = req.files.playlist_img;
  const playlistFilePath = 'public/img/db_img/playlist_img/' + playlistFile.name;
  playlistFile.mv(playlistFilePath, function(err) {
    if (err) {
      res.status(500).send({ error: err });
      return;
    }

    const playlist = new Playlist({
      playlist_name: req.body.playlist_name,
      playlist_img: '/img/db_img/playlist_img/' + playlistFile.name,
      songs_id: songs_name,
    });

    playlist.save(function(err, playlist){
      if(err){
        res.status(500).send({ error: err });
      }
      else{
        res.redirect('/admin');
      }
    });
  });
};  

let addNewAlbum = async (req, res) =>{
  const songs_name = req.body.songs_name;

  const albumFile = req.files.album_img;
  const albumFilePath = 'public/img/db_img/album_img/' + albumFile.name;
  albumFile.mv(albumFilePath, function(err) {
    if (err) {
      res.status(500).send({ error: err });
      return;
    }

    const album = new Album({
      album_name: req.body.album_name,
      album_img: '/img/db_img/album_img/' + albumFile.name,
      artist_name: req.body.artist_name,
      songs_id: songs_name,
    });

    album.save(function(err, album){
      if(err){
        res.status(500).send({ error: err });
      }
      else{
        res.redirect('/admin');
      }
    });
  });
};  

let addNewComment = async (req, res) =>{
  const comment = new Comment({
    user_id: req.body.user_id,
    message: req.body.message,
    day_created: req.body.day_created,
    song_name: req.body.song_name
  });

  comment.save(function(err, song) {
    if (err) {
      res.status(500).send({ error: err });
      console.log(err);
    } else {
      res.redirect('/admin');
    }
  });
}

let addNewUser = async (req, res) =>{
  const user = new User({
    username: req.body.username,
    user_fullname: req.body.user_fullname,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_type: req.body.user_type,
    premium: req.body.premium,
  });

  user.save(function(err, user) {
    if (err) {
      res.status(500).send({ error: err });
      console.log(err);
    } else {
      res.redirect('/admin');
    }
  });
}

let getCommentData = (req, res) => {
  const commentId = req.params.id;
  Comment.findById(commentId).populate({
      path: 'user_id',
      model: 'User'
  }).exec((err, comment) => {
          if (err) {
              console.log(err);
              res.status(500).json({ error: err });
          } else {
              res.json(comment);
          }       
      });
}

let getSongData = (req, res) => {
  const songId = req.params.id;
  Song.findById(songId).populate({
      path: 'artists_id',
      model: 'Artist'
  }).exec((err, song) => {
          if (err) {
              console.log(err);
              res.status(500).json({ error: err });
          } else {
              res.json(song);
          }       
      });
}
let editSong = async (req, res) => {
  const songId = req.body.song_id;
  const artistsName = req.body.edit_artists_name;
  // Get the old song document from database
  const oldSong = await Song.findById(songId).exec();
  fs.unlinkSync('public' + oldSong.song_path);
  fs.unlinkSync('public' + oldSong.song_img);
  fs.unlinkSync('public' + oldSong.song_lyric);

  const songFile = req.files.edit_song_path;
  const songFilePath = 'public/song_mp3/' + songFile.name;
  songFile.mv(songFilePath, function(err) {
    if (err) {
      res.status(500).send({ error: err });
      return;
    }

    // Store the new song image file
    const songImageFile = req.files.edit_song_img;
    const songImageFilePath = 'public/img/db_img/song_img/' + songImageFile.name;
    songImageFile.mv(songImageFilePath, function(err) {
      if (err) {
        res.status(500).send({ error: err });
        return;
      }

      // Store the new song lyrics file
      const songLyricsFile = req.files.edit_song_lyric;
      const songLyricsFilePath = 'public/song_lyrics/' + songLyricsFile.name;
      songLyricsFile.mv(songLyricsFilePath, function(err) {
        if (err) {
          res.status(500).send({ error: err });
          return;
        }

        // Update the Song document in database
        Song.findByIdAndUpdate(songId, {
          song_name: req.body.edit_song_name,
          artists_id: artistsName,
          genre_name: req.body.edit_genre_name,
          song_path: '/song_mp3/' + songFile.name,
          song_img: '/img/db_img/song_img/' + songImageFile.name,
          song_lyric: '/song_lyrics/' + songLyricsFile.name,
          song_duration: req.body.edit_song_duration,
          song_rating_star_total: req.body.edit_song_rating
        }, function(err, song) {
          if (err) {
            res.status(500).send({ error: err });
          } else {
            res.json(song);
          }
        });
      });
    });
  });
};

let editComment = (req, res) => {
  const commentId = req.body.comment_id;
  const songName = req.body.edit_song_id;
  const userId = req.body.edit_user_id;
  const message = req.body.edit_message;
  const dayCreated = req.body.edit_day_created;

  Comment.findByIdAndUpdate(commentId, { song_name: songName, user_id: userId, message: message, day_created: dayCreated }, (err, comment) => {
      if (err) {
          console.log(err);
          res.status(500).json({ error: err });
      } else {
          res.json(comment);
      }
  });
}

let deleteComment = (req, res) => {
  const commentId = req.params.id;
  Comment.findByIdAndDelete(commentId, (err, comment) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    } else {
      res.json(comment);
    }
  });
}

let deleteSong = async (req, res) => {
  try {
    const songId = req.params.id;
    const oldSong = await Song.findById(songId).exec();
    fs.unlinkSync('public' + oldSong.song_path);
    fs.unlinkSync('public' + oldSong.song_img);
    fs.unlinkSync('public' + oldSong.song_lyric);
    const deletedSong = await Song.findByIdAndDelete(songId).exec();
    res.json(deletedSong);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
module.exports = {
    getIndex, addNewSong, addNewArtist, addNewPlaylist, addNewAlbum, addNewUser, addNewComment, editComment, deleteComment, getCommentData, getSongData, editSong, deleteSong,
}