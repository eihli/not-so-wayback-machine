var async = require('async');
var should = require('chai').should();
var request = require('supertest');
var leveldown = require('leveldown');

describe('server', function() {

  var app;
  var db;

  before(function(done) {
    // Destroy and recreate test database
    // before each run
    leveldown.destroy('./db/test', function() {
      db = require('./db')('./db/test');
      done();
    });
  });

  beforeEach(function() {
    app = require('./app');
    app = app(db).app;
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

  it('should respond with useful information', function(done) {
    request(app)
      .post('/v1/job/www.google.com')
      .end(function(err, res) {
        if (err) {
          console.log("Error in response", err);
        } else {
          res.body.should.have.property('url');
          res.body.url.should.equal('www.google.com');
          done();
        }
    });
  });

  it('should save url to database', function(done) {
    request(app)
      .post('/v1/job/www.google.com')
      .end(function(err, res) {
        if (err) {
          console.log("Error at post:", err);
          done();
        } else {
          db.get('www.google.com', function(err, value) {
            if (err) {
              err.notFound.should.equal(false, 'Key not found');
              done();
            } else {
              value.should.equal('pending');
              done();
            }
          });
        }
      });
  });

});