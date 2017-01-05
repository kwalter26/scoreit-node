var router = require('express').Router();

module.exports = function (passport) {

    router.get('/login', function (req, res, next) {
        res.render('login');
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    }));

    router.get('/register', function (req, res, next) {
        res.render('register');
    });

    router.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/auth/register',
        failureFlash: true
    }));

    router.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

    return router;
};
