const { User } = require("../models/userModel");

//[GET] index
let getIndex = async (req, res) =>{
    const error = req.flash('error')
    const user = await User.findById({_id: req.session.user._id}).exec()
    res.render('profile', { title: 'Profile', error, user: user });
}
let updateProfile = async (req, res)=>{
    const userId = req.body.id;
    const name = req.body.name;
    const oldpass = req.body.oldpass;
    const newpass = req.body.newpass;
    const confirmpass = req.body.confirmpass;

    const user = await User.findById({_id: userId}).exec();
    if(oldpass != user.user_password){
        req.flash('error', 'Old password is wrong');
        return res.json(user);
    }
    else if(newpass != confirmpass)
    {
        req.flash('error', 'Password does not match');
        return res.json(user);
    }
    else{
        User.findByIdAndUpdate(userId, { user_fullname: name, user_password: newpass}, (err, user) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                req.flash('error', 'Updated succesfully');
                return res.json(user)
            }
        });
    }
}

module.exports = {
    getIndex, updateProfile
}; 

