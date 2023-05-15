let getIndex = (req, res) =>{
    res.render('advertisement', { title: 'Advertisement' });
}

module.exports = {
    getIndex,
}