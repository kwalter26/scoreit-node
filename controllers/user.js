var User = require('../models/user');
module.exports = function(){
    this.createUser = function (username, password, email,firstName,lastName, role, status, callback) {
      User.findOne({ 'username': username }, function (err, user) {
        if(err){
          log(err);
          return callback(null,err);
        }
        if(!user){
          var newUser = new User();
          newUser.firstName = firstName;
          newUser.lastName = lastName;
          newUser.username = username;
          newUser.email = email;
          newUser.role = role;
          newUser.status = status;
          if (password) newUser.updatePassword(password);
          newUser.save(function (err) {
            if(err){
              log(err);
              return;
            }
            return callback(null,newUser);
          });
        }
        return callback(null,'Username Already Exists');
      });
    };
    this.getUser = function(username, callback){
      User.findOne({'username':username},
      {
          __v:false,
          password:false,
          token:false,
          tokenExpire:false,
      },
      function(err,user){
        if(err){
          log(err);
          return callback(err,null);
        }
        if(user){
          log('User retrieved: ' + username);
          return callback(null,user);
        }
        log('User not found' + username);
        return callback('User not found',null);
      });
    };
    this.getUsers = function(role,callback){
      User.find({role:role},
        {
            __v:false,
            password:false,
            token:false,
            tokenExpire:false,
        },
        function(err,users){
          if(err){
            log(err);
            return callback(null,err);
          }
          if(users){
            log('Users retrieved with role:'+ role);
            return callback(users,null);
          }
          log('No users found under role:' + role);
          return callback(null,'No users found under role: ' + role);
        });
    };
    this.delete = function(username,callback){
      User.remove({username:username},function(user,err){
        if(err){
          log(err);
          return callback(null,err);
        }
        if(user){
          log('User removed: ' + username);
          return callback(user,null);
        }
        log('User not found: ' + username);
        return callback(null,'User not found: ' + username);
      });
    };
    function log(message){
      console.log('Mongoose:  ' + message);
    }
    return this;
};
