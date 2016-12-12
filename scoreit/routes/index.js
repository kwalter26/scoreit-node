module.exports = function (app,passport) {

    app.use('/auth', require('./auth')(passport));
    // app.use('/api/user',require('./user'))

    app.get('/', function (req, res, next) {
        res.render('index');
    });




}