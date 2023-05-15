let getIndex = (req, res) =>{
    res.render('cookie-warning', { title: 'Cookie Warning' });
}

module.exports = {
    getIndex,
}