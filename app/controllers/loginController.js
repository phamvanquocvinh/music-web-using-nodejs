const { User } = require("../models/userModel");

    
    //[GET] index
    let login = (req, res) =>{
        const error = req.flash('error')
        const username = req.flash('user')
        res.render('login', { 
          title: 'Login',
          error,
          username,
          hideNavbar: true,
          hideMusicbar: true, 
          hideFooter: true,
        });
    }
    //[POST] login with username - password
    let loginPost = async (req, res) => {
      const { username, password } = req.body;
      const login = await User.findOne({username: username, user_password: password}).exec();
        if (login) {
          req.session.isLoggedIn = true;
          req.session.user = login;
          console.log(login.user_fullname)
          return res.redirect('/');
        }
        else{
          req.flash('user', req.body.username);
          req.flash('error', 'Wrong username or password!');
          res.redirect('/login');
        }
    }

module.exports = {
  login, loginPost
}; 

