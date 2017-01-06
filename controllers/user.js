var User = require('../models/user');
module.exports = {
    newUser: function (username, password, email,firstName,lastName, role, status, callback) {
      User.findOne({ 'username': username }, function (err, user) {
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
              if (err)
                  throw err;
              return callback(newUser,null);
          });
        }
        return callback(null,'Username Already Exists');
      });
    },
    getUser: function(username, callback){
      User.findOne({'username':username},
      {
          __v:false,
          password:false,
          token:false,
          tokenExpire:false,
      },
      function(err,user){
        if(user){
          return callback(user,null);
        }
        return callback(null,'User not found');
      });
    },
    getUsers: function(role,callback){
      User.find({role:role},
        {
            __v:false,
            password:false,
            token:false,
            tokenExpire:false,
        },
        function(err,users){
        if(users){
          return callback(users,null);
        }
        return callback(null,'No users found under role:' + role);
      });
    }
};
