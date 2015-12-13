// Instead of just returning the app, we return
// a setup function that lets us pass in a database.
// This way we can connect to a test or staging or
// production database depending on the environment.
function setupApp(db) {
  var express = require('express');
  var app = express();
  var handlers = require('./handlers')(db);
  var routes = require('./routes');
  var fetchAll = require('./fetcher')(db).fetchAll;

  routes(app, handlers);

  function start(port) {
    port = process.env.PORT || port || 3000;
    app.listen(port);
    console.log("Listening on port", port);
    setInterval(function() {
      fetchAll(function noop() {});
    }, 1000);
  }

  return {
    app: app,
    start: start
  };
}

module.exports = setupApp;