var levelup = require('level');

var createConnection = function(dbPath) {
  var db = levelup(dbPath, {valueEncoding: 'json'});

  db.find = function(key, value, cb) {
    var result;
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
        if (result) {
          cb(null, result);
        } else {
          cb("Not found");
        }
      });
  };
  return db;
};

module.exports = createConnection;