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
    res.send(200);
  }

  function getJob(req, res, next) {
    res.send(200);
  }

  function getHtml(req, res, next) {
    res.send(200);
  }

  function createJob(req, res, next) {
    var job_id = uuid.v1();
    var job = {
      url: req.params.url,
      status: 'pending',
      created_at: Date.now(),
      fetched_at: null
    };
    db.put(job_id, job);
    res.status(200).send(job);
  }

  return handlers;

}
module.exports = setupHandlers;