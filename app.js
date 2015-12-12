var express = require('express');
var app = express();

app.get('/', function(req, res, next) {
  res.send("hello world");
});

function start(port) {
  port = process.env.PORT || port || 3000;
  app.listen(port);
  console.log("Listening on port", port);
}

module.exports = {
  app: app,
  start: start
};