/**
 *      The purpose of this middleware is to check for login and redirect if user is not logged in
 */
module.exports = (req, res, next) => {

    if (!(req.user)) return res.render('user/login');
    next();
}