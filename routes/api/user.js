var router = require('express').Router();
var user = require('../../controllers/user');

router.get('/',function(req,res){
  var role = '';
  switch(req.user.role){
    case 'admin':
      role = '*';
      break;
    case 'leagueManager':
      role = 'coach';
      break;
    case 'coach':
      role = 'player';
      break;
  }
  user.getUsers(role,function(users,err){
    return res.json(users);
  });
});

router.get('/:username',function(req,res){
  user.getUser(req.params.username,function(user,err){
    return res.json(user);
  });
});

module.exports = router;
