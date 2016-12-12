var router = require('express').Router();

module.exports = function (app) {

    router.get('/login', function (req, res, next) {
        res.render('login');
    });

    router.get('/register', function (req, res, next) {
        res.send('Register');
    });

    return router;
}