var http = require('http');
var async = require('async');

function setupFetcher(db) {

  var obj = {
    fetch: fetch
  };

  function getHtml(url, cb) {
    var options = {
      host: url,
      port: 80
    };

    http.request(options, function(res) {
      response = '';
      res.on('data', function(chunk) {
        response += chunk;
      });
      res.on('end', function() {
        cb(null, response);
      });
    })
    .on('error', function(err) {
      // console.log(err);
      cb(err);
    })
    .end();

  }

  function fetch(url, cb) {
    getHtml(url, function(err, html) {
      if (err) {
        cb(err);
      } else {
        db.find('url', url, function(err, site) {
          if (err) {
            cb(err);
          } else {
            site.value.html = html;
            site.fetched_at = Date.now();
            site.status = 'completed';
            db.put(site.key, site.value, {sync: true}, function() {
              cb(null, site);
            });
          }
        });
      }
    });
  }

  return obj;
}


module.exports = setupFetcher;