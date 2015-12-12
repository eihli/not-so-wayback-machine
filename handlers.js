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
    var job = {
      url: req.params.url
    };
    db.put(job.url, "pending");
    res.status(200).send(job);
  }

  return handlers;

}
module.exports = setupHandlers;