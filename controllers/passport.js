var LocalStrategy = require('passport-local').Strategy;
var userController = require('./user');
var User = require('../models/user');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            process.nextTick(function () {
                userController.createUser(username,password,req.body.email,req.body.firstName,req.body.lastName,req.body.accountType,0, function(err,user){
                    if (err) {
                        return done(null, false, req.flash('error', err));
                    } else {
                        return done(null,user);
                    }
                });
            });
        }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        User.findOne({ 'username': username }, function (err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('error', 'No user found.'));
            if (!user.validPassword(password))
                return done(null, false, req.flash('error', 'Oops! Wrong password.'));
            return done(null, user);
        });

    }));
};
