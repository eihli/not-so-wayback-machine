var app = require('./app');
var db = require('./db.js')('./db/production');
app = app(db);

app.start();