var router = require('express').Router();

router.get('/dashboard',function(req,res,next){
  res.render('pages/dashboard');
});

router.get('/league',require('permission')(['user']),function(req,res,next){
  console.log('Here');
  res.render('pages/league');
});

module.exports = router;
