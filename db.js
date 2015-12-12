var levelup = require('level');

var createConnection = function(dbPath) {
  var db = levelup(dbPath, {valueEncoding: 'json'});

  db.find = find;
  db.findAll = findAll;

  function find(key, value, cb) {
    var result = null;
    db.createReadStream()
      .on('data', function(data) {
        if (data.value[key] === value) {
          result = data;
        }
      })
      .on('error', function(err) {
        console.log(err);
      })
      .on('end', function() {
        cb(result);
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
        cb(results);
      });
  }

  return db;
};

module.exports = createConnection;