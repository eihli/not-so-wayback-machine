var async = require('async');
var should = require('chai').should();
var request = require('supertest');
var leveldown = require('leveldown');

describe('API', function() {

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

  after(function(done) {
    db.close(done);
  });

  beforeEach(function() {
    app = require('./app');
    app = app(db).app;
  });

  it('should respond with correct status codes', function(done) {
    async.parallel([
      function(cb) {
        request(app)
          .get('/v1/job/1')
          .expect(200)
          .end(function(err, res) {
            cb(null);
          });
      },
      function(cb) {
        request(app)
          .get('/v1/job')
          .expect(200)
          .end(function(err, res) {
            cb(null);
          });
      },
      function(cb) {
        request(app)
          .post('/v1/job/url')
          .expect(201)
          .end(function(err, res) {
            cb(null);
          });
      },
      function(cb) {
        request(app)
          .get('/garbage')
          .expect(404)
          .end(function(err, res) {
            cb(null);
          });
      },
      function(cb) {
        request(app)
          .post('/garbage')
          .expect(404)
          .end(function(err, res) {
            cb(null);
          });
      }
    ], done);
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
          db.find('url', 'www.google.com', function(err, result) {
            if (result === null) {
              // console.log(result);
              result.should.equal('Key/Value pair not found.');
              done();
            } else {
              result.value.url.should.equal('www.google.com');
              result.value.status.should.equal('pending');
              done();
            }
          });
        }
      });
  });

});

describe('fetcher', function() {

  var fetcher;
  var fetch;
  var app;
  var db;

  before(function(done) {
    leveldown.destroy('./db/test', function() {
      db = require('./db')('./db/test');
      fetcher = require('./fetcher')(db);
      fetch = fetcher.fetch;
      done();
    });
  });

  after(function(done) {
    db.close(done);
  });

  beforeEach(function() {
    app = require('./app');
    app = app(db).app;
  });

  // TODO: Mock? Serve up something local?

  it('should fetch html and save to database', function(done) {
    request(app)
      .post('/v1/job/www.google.com')
      .end(function(err, res) {
        fetch('www.google.com', function(err, res) {
          if (err) {
            console.log(err);
          } else {
            db.find('url', 'www.google.com', function(err, site) {
              site.value.html.should.be.a('string');
              site.value.html.slice(site.value.html.length - 7).should.equal('</html>');
              done();
            });
          }
        });
      });
  });

});

describe('database', function() {

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

  after(function(done) {
    db.close(done);
  });

  beforeEach(function() {
    app = require('./app');
    app = app(db).app;
  });

  it('should return all matching key/value pairs', function(done) {
    db.put('1', {'name': 'eric'});
    db.put('2', {'name': 'eric'});
    db.put('3', {'name': 'taylor'});
    async.parallel([
      function(cb) {
        db.findAll('name', 'eric', function(result) {
          result.length.should.equal(2);
          cb(null);
        });
      },
      function(cb) {
        db.findAll('name', 'taylor', function(result) {
          result.length.should.equal(1);
          cb(null);
        });
      }
    ], done);
  });

});