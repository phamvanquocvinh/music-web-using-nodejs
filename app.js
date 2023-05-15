var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const getAlbumInformationRouter = require('./routes/albumInformationRoute');
const getArtistRouter = require('./routes/artistsRoute');
const getCategoriesRouter = require('./routes/categoriesRoute');
const getCommentRouter = require('./routes/commentRoute');
const getDecadesRouter = require('./routes/decadesRoute');
const getIndexRouter = require('./routes/indexRoute');
const getLibaryRouter = require('./routes/libraryRoute');
const getLoginRouter = require('./routes/loginRoute.js');
const getLikedSongsRouter = require('./routes/likedSongsRoute.js');
const getLyricsRouter = require('./routes/lyricsRoute.js');
const getPlaylistInformationRouter = require('./routes/playlistInformationRoute.js');
const getPremiumRouter = require('./routes/premiumRoute.js');
const getProfileRouter = require('./routes/profileRoute.js');
const getRegisterRouter = require('./routes/registerRoute.js');
const getSearchRouter = require('./routes/searchRoute.js');
const getUsersRouter = require('./routes/usersRoute.js');
const getCookieWarningRouter = require('./routes/cookieWarningRoute.js');
const getAboutUsRouter = require('./routes/aboutUsRoute.js');
const getPrivacyPolicyRouter = require('./routes/privacyPolicyRoute.js');
const getFeedbackRouter = require('./routes/feedbackRoute.js');
const getAdvertisementRouter = require('./routes/advertisementRoute.js');
const getTimeRouter = require('./routes/timeRoute.js');
const getRatingRouter = require('./routes/ratingRoute.js');
const getLandingRouter = require('./routes/landingRoute.js');
const getAdminRouter = require('./routes/adminRoute.js');
const getFeatureArtistRouter = require('./routes/featureArtistsRoute.js');
const fileUpload = require('express-fileupload');
const nodemailer = require('nodemailer');



const app = express();

// link script.js
app.use(express.static('public'));
app.get('./public/favicon.ico', (req, res) => res.status(204));

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(flash());

// view engine setup
const hbs = require('hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerHelper("inc", function(value, options)
{
  return parseInt(value) + 1;
});
hbs.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('timeElapsed', function(commentDate) {
  const commentTime = new Date(commentDate).getTime();
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - commentTime;
  const minuteDiff = Math.floor(timeDiff / 1000 / 60);

  if (minuteDiff < 1) {
    return 'just now';
  } else if (minuteDiff === 1) {
    return '1 minute ago';
  } else if (minuteDiff < 60) {
    return minuteDiff + ' minutes ago';
  } else if (minuteDiff < 120) {
    return '1 hour ago';
  } else if (minuteDiff < 1440) {
    return Math.floor(minuteDiff / 60) + ' hours ago';
  } else if (minuteDiff < 2880) {
    return '1 day ago';
  } else {
    return Math.floor(minuteDiff / 1440) + ' days ago';
  }
});

hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/img", express.static(path.join(__dirname, "/public/img")));
app.use("/video", express.static(path.join(__dirname, "/public/video")));
app.use("/song_lyrics", express.static(path.join(__dirname, "/public/song_lyrics")));
app.use("/song_mp3", express.static(path.join(__dirname, "/public/song_mp3")));
app.use(fileUpload());

//MVC updated
getLyricsRouter(app);
getPlaylistInformationRouter(app);
getPremiumRouter(app);
getProfileRouter(app);
getRegisterRouter(app);
getSearchRouter(app);
getUsersRouter(app);
getLikedSongsRouter(app);
getLoginRouter(app);
getAlbumInformationRouter(app);
getArtistRouter(app);
getCategoriesRouter(app);
getCommentRouter(app);
getDecadesRouter(app);
getIndexRouter(app);
getLibaryRouter(app);
getCookieWarningRouter(app);
getAboutUsRouter(app);
getPrivacyPolicyRouter(app);
getFeedbackRouter(app);
getAdvertisementRouter(app);
getTimeRouter(app);
getRatingRouter(app);
getLandingRouter(app);
getAdminRouter(app);
getFeatureArtistRouter(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
