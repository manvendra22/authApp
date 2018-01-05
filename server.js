const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// firing the app
const app = express();

app.use(morgan('dev'));
app.use(bodyParser());
app.use(cookieParser());

// configuring database
const mongoose = require('mongoose');
const db = require('./config/db')

mongoose.connect(db.url, (err, result) => {
    if(err) throw err;
    console.log("Database connected");
});

// configuring passport
const passport = require('passport');
const session = require('express-session');

app.use(session({secret: "Auth app"}));
app.use(passport.initialize());
app.use(passport.session());

// flash to store and show messages
const flash = require('connect-flash');
app.use(flash());

// setting up view engine
app.set('view engine', 'ejs');

// initialize Passport
const initPassport = require('./passport/init');
initPassport(passport);

// another middleware, for routes, DONT KNOW YET
const routes = require('./routes/index')(passport);
app.use('/', routes);

// DONT KNOW YET

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        // res.render('error', {
        //     message: err.message,
        //     error: err
        // });
        console.log("From response, message: "+err.message);
        console.log("From response, error: "+error);
    });
}

module.exports = app;