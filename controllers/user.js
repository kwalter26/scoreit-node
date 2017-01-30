var User = require('../models/user');
var exports = {};

exports.createUser = function (username, password, email,firstName, lastName, role, status, done) {
  User.findOne({ 'username': username }, function (err, user) {
    if(err){
      log(err);
      return done(null,err);
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
      newUser.save(function (err,newUser) {
        if(err){
          log(err);
          return done(err,null);
        }
        log('User created: ' + username);
        return done(null,newUser);
      });
    }else{
      return done('Username Already Exists',null);
    }
  });
};
exports.getUser = function(username, callback){
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
exports.getUsers = function(role,callback){
  if(role == 'admin'){
    console.log('here');
    role = {};
  }else{
    console.log('there');
    role = {role:role};
  }

  User.find(role,
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
        return callback(null,users);
      }
      log('No users found under role:' + role);
      return callback('No users found under role: ' + role,null);
    });
};
exports.editUser = function (username, password, email,firstName,lastName, role, status, callback) {
  User.findOne({username:username},{

  },function(err,user){
    if(err){
        log(err);
        return callback(null,err);
    }
    if(user){
      user.firstName = firstName;
      user.lastName = lastName;
      user.username = username;
      user.email = email;
      user.role = role;
      user.status = status;
      if (password) newUser.updatePassword(password);
      user.save(function (err) {
        if(err){
          log(err);
          return;
        }
        log('User edited: ' + username);
        return callback(null,newUser);
      });
    }
    log('User not found: ' + username);
    return callback('User not found',null);
  });
};
exports.delete = function(username,callback){
  User.remove({username:username},function(err,user){
    if(err){
      log(err);
      return callback(err,null);
    }
    if(user){
      log('User removed: ' + username);
      return callback(null,user);
    }
    log('User not found: ' + username);
    return callback('User not found: ' + username,null);
  });
};
exports.authenticate = (username,password,done)=>{
  User.findOne({username:username},(err,user)=>{
    if (err)
      return done(err,null);
    if (!user)
        return done('No user found.', null);
    if (!user.validPassword(password))
        return done('Oops! Wrong password.', null);
    return done(null, user);
  });
};
let log = (message)=>{
  console.log('Mongoose:  ' + message);
};

export default exports;
