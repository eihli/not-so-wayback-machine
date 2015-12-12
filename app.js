var express = require('express');
var app = express();
var handlers = require('./handlers');
var routes = require('./routes');

routes(app, handlers);

function start(port) {
  port = process.env.PORT || port || 3000;
  app.listen(port);
  console.log("Listening on port", port);
}

module.exports = {
  app: app,
  start: start
};