/**
 *      The purpose of this middleware is to check for a valid user
 */

const User = require('../models/user');
module.exports = (req, res, next) => {
    //  Check for session and session id
    if(!(req.session && req.session.userId)) {
        return next();
    }

    //  If session is found, validate the user
    User.findById(req.session.userId, (err, user) => {
        //  Error check for invalid user
        if(err) {
            return next(err);
        }
        if (!user) {
            return next();
        }

        //  User setup
        user.password = undefined;
        req.user = user;
        res.locals.user = user;
        next();
    });

};