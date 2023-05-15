//[GET] index
let getIndex = (req, res) =>{
    res.render('users', { title: 'Users' });
}

module.exports = {
    getIndex,
}; 

