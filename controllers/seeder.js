var user = require('./user');

module.exports = function(){


  this.admin = function(callback){
    user.createUser('admin','password','admin@titanburg.me','Super','Admin','admin',3,function(user,err){
      callback();
    });
  };

  this.leagueManager = function(callback){

  };

  return this;
};
