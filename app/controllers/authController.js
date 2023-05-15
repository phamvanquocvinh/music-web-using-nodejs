let checkLogin = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    }
    else{
        req.flash('error', 'You must login to use that function');
        return res.redirect('/login');
    }
}

let checkAdmin = (req, res, next) => {
if (req.session.user && req.session.user.user_type === 'admin') {
    next();
} else {
    req.flash('error', 'You are not an admin')
    res.redirect('/login');
}
};
  module.exports = {
    checkLogin, checkAdmin,
  }