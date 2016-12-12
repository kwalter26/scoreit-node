'use strict';

//Dependencies
var express = require('express');
var app = express();
var port = process.env.port || 1337;
var bodyParser = require('body-parser');
var sessions = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');
var path = require('path');

// Database Connection
mongoose.connect(process.env.MONGO_STRING, function (err) {
    if (err) console.log('Mongoose:   Error occured!', err);
    else console.log('Mongoose:   Connected');
});
var MongoStore = require('connect-mongo')(sessions);
var sessionStore = new MongoStore({ mongooseConnection: mongoose.connection, clear_interval: 10000 });

// Sessions
app.use(sessions({
    secret: process.env.SECRET,
    store: sessionStore,
    cookie: {
        maxAge: 600000
    }
}));

 
// Routing
require('./routes/index');

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});