var http = require('http');

function fetch(url, cb) {
  var options = {
    host: url,
    port: 80
  };

  http.request(options, function(res) {
    result = '';
    res.on('data', function(chunk) {
      result += chunk;
    });
    res.on('end', function() {
      cb(result);
    });
  })
  .on('error', function(err) {
    console.log(err);
    cb(err);
  })
  .end();
}

module.exports = fetch;