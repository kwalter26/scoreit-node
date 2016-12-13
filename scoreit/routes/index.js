module.exports = function (app, passport) {

    app.use('/auth', require('./auth')(passport));
    // app.use('/api/user',require('./user'))

    app.get('/admin', require('permission')(['admin']), function (req, res, next) {
        res.send('Admin');
    });

    app.get('/', require('permission')(['admin','user']), function (req, res, next) {
        res.render('index');
    });


};