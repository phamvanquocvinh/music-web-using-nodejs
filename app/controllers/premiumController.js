//[GET] index
let getIndex = (req, res) =>{
    res.render('premium', { title: 'Premium' });
}

module.exports = {
    getIndex,
}; 

