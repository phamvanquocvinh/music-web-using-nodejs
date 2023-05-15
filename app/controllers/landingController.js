//[GET] index
let getIndex = (req, res) =>{
    res.render('landing', { title: 'Landing Page',
    hideNavbar: true, 
    hideMusicbar: true, 
    hideFooter: true, });
}

module.exports = {
    getIndex,
}; 