var router = require('express').Router();

router.get('/dashboard',function(req,res,next){
  res.render('pages/dashboard');
});

router.get('/league',require('permission')(['admin','leagueManager']),function(req,res,next){
  console.log('Here');
  res.render('pages/league');
});

router.get('/admin',require('permission')(['admin']),function(req,res,next){
  res.render('pages/admin');
});

module.exports = router;
