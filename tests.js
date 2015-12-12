var should = require('chai').should();
var request = require('supertest');

describe('server', function() {

  var app;

  beforeEach(function() {
    app = require('./app').app;
  });

  it('should respond to get request', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

});