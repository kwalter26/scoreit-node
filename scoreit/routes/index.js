var router = require('express').Router();

module.exports = function (app) {

    router.get('/auth', require('./auth'));
    router.get('/', function (req, res, next) {
        res.render('index');
    });    




    return router;
}