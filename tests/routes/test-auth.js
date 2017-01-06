var chai = require('chai');
var request = require('supertest');
var server = require('../../server');

describe('loading express', function () {
  it('responds to /auth/login', function testSlash(done) {
    request(server)
      .get('/auth/login')
      .expect(200, done);
  });
  it('responds to /auth/register', function testSlash(done) {
    request(server)
      .get('/auth/register')
      .expect(200, done);
  });
  it('302 found after redirect',function testRedirect(done){
    request(server)
      .get('/foo/bar')
      .expect(302, done);
  });
});
