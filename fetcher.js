var http = require('http');
var async = require('async');
var request = require('request');

function setupFetcher(db) {

  var obj = {
    fetch: fetch,
    fetchAll: fetchAll
  };

  function getHtml(url, cb) {
    request('http://' + url, function(err, res, body) {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, body);
      }
    });
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
            site.value.fetched_at = Date.now();
            site.value.status = 'completed';
            db.put(site.key, site.value, function() {
              cb(null, site);
            });
          }
        });
      }
    });
  }

  function fetchAll(cb) {
    var updatedSites = [];
    db.findAll('status', 'pending', function(err, pendingRequests) {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        pendingRequests.forEach(function(pendingRequest) {
          fetch(pendingRequest.value.url, function(err, site) {
            console.log("Processing pending request for: ", site.value.url);
            if (err) {
              console.log(err);
            } else {
              updatedSites.push(site);
            }
          });
        });
        cb(null, updatedSites);
      }
    });
  }

  return obj;
}


module.exports = setupFetcher;