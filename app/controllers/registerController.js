const { User } = require("../models/userModel");
const nodemailer = require('nodemailer');

//[GET] index
let getIndex = (req, res) =>{
  const error = req.flash('error')
  const username = req.flash('user')
  const name = req.flash('name')
  const mail = req.flash('mail')
    res.render('register', { title: 'Register',
    username,
    name,
    mail,
    error,
    hideNavbar: true, 
    hideMusicbar: true, 
    hideFooter: true,
  });
}
let register = async(req, res) =>{
        const {name, username, email, password, confirm_password} = req.body;
        // Check if email already exists
        const existingEmail = await User.findOne({ user_email: email });
        if (existingEmail) {
          req.flash('user', req.body.username);
          req.flash('name', req.body.name);
          req.flash('mail', req.body.email);
          req.flash('error', 'Email already exists');
          return res.redirect('/register');
        }
        // Check if username already exists
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
          req.flash('user', req.body.username);
          req.flash('name', req.body.name);
          req.flash('mail', req.body.email);
          req.flash('error', 'Username already exists');
          return res.redirect('/register');
        }
        if(password != confirm_password){
          req.flash('user', req.body.username);
          req.flash('name', req.body.name);
          req.flash('mail', req.body.email);
          req.flash('error', 'Password and confirm password do not match');
          return res.redirect('/register');
        }
        // Create the user
        const user = new User({
          username : username,
          user_fullname : name,
          user_email : email,
          user_password : password,
        });
        // Save the user to the database
        try {
          await user.save();
           // Gửi email thông báo đăng ký thành công
           const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'nhattan3105.forwork@gmail.com',
              pass: 'ahrbjcsskeemmhcv',
            },
            tls: {
              rejectUnauthorized: false,
            },
          });
          await transporter.sendMail({
            from: '[Admin-paradisemusic] <paradisemusic@support.com>',
            to: email,
            subject: 'Welcome to My Music App',
            html: '<p>Thank you for registering to My Music App!</p>',
          });
          
          req.flash('error', 'Created succesfully');
          res.redirect('/login');;
        } catch (error) {
          res.status(500).send({ message: 'Internal server errorss' });
        }
    };
module.exports = {
    getIndex, register,
}; 


