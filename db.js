var levelup = require('level');

var createConnection = function(dbPath) {
  return levelup(dbPath);
};

module.exports = createConnection;