//  Check if session established and if user has logged in by it signing their userId (_id)
module.exports = (req, res, next) => {
    if (!(req.session.userId && req.session)) return res.render('user/login');
        console.log("access granted");
    next();
}