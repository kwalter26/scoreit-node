var router = require('express').Router();
var user = require('../../controllers/user');

router.get('/all',function(req,res){

  var role = 'leagueManager';
  switch(req.user.role){
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

module.exports = router;
