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
  res.send(200);
}

module.exports = handlers;