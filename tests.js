var async = require('async');
var request = require('supertest');

describe('server', function() {

  var app;

  beforeEach(function() {
    app = require('./app').app;
  });

  it('should respond with correct status codes', function(done) {
    async.parallel([
      function() {
        request(app)
          .get('/v1/job/1')
          .expect(200);
      },
      function() {
        request(app)
          .get('/v1/job')
          .expect(200);
      },
      function() {
        request(app)
          .post('/v1/job/url')
          .expect(201);
      },
      function() {
        request(app)
          .get('/garbage')
          .expect(404);
      },
      function() {
        request(app)
          .post('/garbage')
          .expect(404);
      },
      function() {
        done();
      }
    ]);
  });

});