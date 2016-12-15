//Dependencies
var express = require('express');
var app = express();
var port = process.env.port || 3000;
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');
var path = require('path');
var flash = require('connect-flash');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
//mongoose.connect(process.env.MONGO_STRING, function (err) {
mongoose.connect('mongodb://kali.walter.home:27017/scoreitdb', function (err) {
    if (err) console.log('Mongoose:   Error occured!', err);
    else console.log('Mongoose:   Connected');
});
var MongoStore = require('connect-mongo')(session);
var sessionStore = new MongoStore({ mongooseConnection: mongoose.connection, clear_interval: 10000 });

// Sessions and Passport
app.use(session({
    secret: process.env.SECRET,
    store: sessionStore,
    cookie: {
        maxAge: 600000
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./controllers/passport')(passport);
app.set('permission', {
    role: 'role',
    notAuthenticated: {
        flashType: 'error',
        message: 'The entered credentials are incorrect',
        redirect: '/auth/login'
    }
});

// Routing
require('./routes/index')(app,passport);

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.listen(port, function () {
    console.log('Example app listening on port '+port+'!');
});
