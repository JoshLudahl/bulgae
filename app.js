
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sessions = require('client-sessions');
const csrf = require('csurf')

//  Middleware
const settings = require('./settings');
const coors = require('./api/middleware/coors');
const ensureLogin = require('./api/middleware/login_check');
const userCheck = require('./api/middleware/user_mw');

//  DB
const connectionURL ='mongodb://' + settings.MONGO_USER + ':' + settings.MONGO_PW + settings.MONGO_URI;
mongoose.connect(connectionURL, {useNewUrlParser: true, useCreateIndex: true});
mongoose.Promise = global.Promise;

//  Logging
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());


//  Allow CORS access
app.use(coors);

//  Paths
app.set('views', path.join(__dirname, '/public/pages'));
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/public'));

//  Cookies
app.set('trust proxy', 1) // trust first proxy

/**
 *      Change secure to true on production
 */
app.use(sessions({
  secret: settings.COOKIE_SECRET,
  cookieName: 'session',
  resave: true,
  saveUninitialized: true,
  cookie: {
      secure: false,
      httpOnly: true,
      ephemeral: true,
      overwrite: true
    }
}));

app.use(csrf());


app.use(userCheck);
//  ROUTES
//  Landing Route
app.use('/', require('./api/routes/index'));

//  Users Route
app.use('/users', require('./api/routes/users'));

//  Dashboard
app.use('/dashboard', ensureLogin, require('./api/routes/dashboard'));
app.use('/budgets', ensureLogin, require('./api/routes/budgets'));

//  Admin Route
//  Using auth middleware to protect endpoint and ensure login
app.use('/admin', ensureLogin, require('./api/routes/admin'));

//  CUSTOM ERROR HANDLING
app.use((req, res, next) => {
    const error = new Error('404 Not found.');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//  export the app
module.exports = app;