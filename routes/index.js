module.exports = function (app, passport) {

    app.use('/auth', require('./auth')(passport));
    app.use('/page', require('./pages'));
    app.use('/api/user', require('./api/user'));

    app.get('/*', require('permission')(['admin','leagueManager']), function (req, res, next) {
        console.log('here');
        res.render('index',{user:{role:req.user.role}});
    });
};
