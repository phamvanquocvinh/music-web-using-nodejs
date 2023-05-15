let getIndex = (req, res) =>{
    res.render('aboutUs', { title: 'About Us' });
}

module.exports = {
    getIndex,
}