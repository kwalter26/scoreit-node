var router = require('express').Router();
module.exports = function (passport) {

    router.get('/login', function (req, res, next) {
        res.render('login');
    });

    router.get('/register', function (req, res, next) {
        res.render('register');
    });

    router.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/', 
        failureRedirect: '/auth/register', 
        failureFlash: true 
    }));

    return router;
}