var user = require('./user');


user.newUser('admin','password','admin@titanburg.me','Super','Admin','admin',3,function(user,err){
  if(!user){
    console.log('Mongoose:   Admin already seeded');
  }else{
    console.log('Mongoose:   Admin Seeded');
  }
});
