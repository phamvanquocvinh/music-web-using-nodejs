let getIndex = (req, res) => {
    res.render('decades', { title: 'Decades Top Hits' });
}

module.exports = {
    getIndex,
}