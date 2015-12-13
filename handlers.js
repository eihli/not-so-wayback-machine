// Instead of just returning the handlers
// we use a setup function that lets us pass
// in a database. This way we can use a separate
// database for testing.

// We are using uuids for unlimited horizontal scalability!
var uuid = require('node-uuid');

function setupHandlers(db) {

  var handlers = {
    getJobQueue: getJobQueue,
    getJob: getJob,
    getHtml: getHtml,
    createJob: createJob
  };

  function getJobQueue(req, res, next) {
    res.status(200).send();
  }

  function getJob(req, res, next) {
    res.status(200).send();
  }

  function getHtml(req, res, next) {
    var url = req.params.url;
    db.find('url', url, function(err, data) {
      if (err) {
        console.log(err);
        res.status(404).send();
      } else {
        res.status(200).send(data);
      }
    });
  }

  function createJob(req, res, next) {
    var job_id = uuid.v1();
    var job = {
      url: req.params.url,
      status: 'pending',
      html: null,
      created_at: Date.now(),
      fetched_at: null
    };
    db.put(job_id, job);
    res.status(200).send(job);
  }

  return handlers;

}
module.exports = setupHandlers;