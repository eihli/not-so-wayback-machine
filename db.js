var levelup = require('level');

// TODO: Pull out dbConfig. Should contain path and options.
var createConnection = function(dbPath) {
  var db = levelup(dbPath, {valueEncoding: 'json'});

  db.find = find;
  db.findAll = findAll;

  function find(key, value, cb) {
    var result = '';
    db.createReadStream()
      .on('data', function(data) {
        if (data.value[key] === value) {
          result = data;
        }
      })
      .on('error', function(err) {
        cb(err);
      })
      .on('end', function() {
        cb(null, result);
      });
  }

  function findAll(key, value, cb) {
    var results = [];
    db.createReadStream()
      .on('data', function(data) {
        if (data.value[key] === value) {
          results.push(data);
        }
      })
      .on('error', function(err) {
        console.log(err);
      })
      .on('end', function() {
        cb(null, results);
      });
  }

  return db;
};

module.exports = createConnection;