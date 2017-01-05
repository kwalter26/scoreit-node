module.exports = function (app, passport) {

    app.use('/auth', require('./auth')(passport));
    app.use('/page', require('./pages'));
    // app.use('/api/user',require('./user'))

    app.get('/*', require('permission')(['admin','user']), function (req, res, next) {
        res.render('index');
    });
};
