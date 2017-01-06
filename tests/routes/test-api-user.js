var chai = require('chai');
var should = chai.should();
var session = require('supertest-session');
var server = require('../../server');
var testSession = session(server);
var user = require('../../controllers/user');



before(function(done){
  user.newUser('testLM', 'test', 'test@test.com','Leauge','Manager','leagueManager',0,function(user,error){ 
    done();
  });
});

describe('Test User login',function(done){
  it('should not login with incorrect credentials',function(done){
    testSession
    .post('/auth/login')
    .send({
      username: 'admin',
      password: 'assword'
    })
    .end(function(err,res){
      res.headers.location.should.have.equal('/auth/login');
      done();
    });
  });
  it('should login with correct credentials',function(done){
    testSession
    .post('/auth/login')
    .send({
      username: 'admin',
      password: 'password'
    })
    .end(function(err,res){
      res.headers.location.should.have.equal('/');
      done();
    });
  });
});

describe('Get all users',function(done){
  it('should get one user with admin role',function(done){
    testSession
      .get('/api/user/all')
      .end(function(err,res){
        console.log(res.body);
        res.body.length.should.have.equal(1);
        done();
      });
  });
});
