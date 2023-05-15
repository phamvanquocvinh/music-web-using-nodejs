//[GET] index
let getIndex = (req, res) =>{
    res.render('time', { title: 'Time' });
}

module.exports = {
    getIndex,
}; 

