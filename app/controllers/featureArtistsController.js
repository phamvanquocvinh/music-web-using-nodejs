let getIndex = (req, res) =>{
    res.render('feature-artists', { title: 'Featured Artists' });
}

module.exports = {
    getIndex,
}