let getIndex = (req, res) =>{
    res.render('feedback', { title: 'Feedback' });
}

module.exports = {
    getIndex,
}