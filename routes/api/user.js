var router = require('express').Router();
var user = require('../../controllers/user');

router.get('/',function(req,res){
  var role = '';
  switch(req.user.role){
    case 'admin':
      role = 'admin';
      break;
    case 'leagueManager':
      role = 'coach';
      break;
    case 'coach':
      role = 'player';
      break;
  }
  user.getUsers(role,function(err,users){
    return res.json({users:users,error:err});
  });
});

router.post('/',function(req,res){

});

router.get('/:username',function(req,res){
  user.getUser(req.params.username,function(err,user){
    return res.json({user:user,error:err});
  });
});

module.exports = router;
