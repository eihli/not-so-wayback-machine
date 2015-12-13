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

  // TODO: I don't think this is needed for MVP requirements.
  function getJobQueue(req, res, next) {
    res.status(200).send();
  }

  function getJob(req, res, next) {
    var id = req.params.id;
    if (id) {
      db.get(id, function(err, data) {
        if (err) {
          if (err.notFound) {
            res.status(404).send({
              "error": "id not found"
            });
          } else {
            console.log(err);
            res.send(err);
          }
        } else {
          res.send(data);
        }
      });
    } else {
      console.log("No id given");
      res.send("Give an id");
    }
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
      key: job_id,
      value: {
        url: req.params.url,
        status: 'pending',
        html: null,
        created_at: Date.now(),
        fetched_at: null
      }
    };
    db.put(job.key, job.value);
    res.status(200).send(job);
  }

  return handlers;

}
module.exports = setupHandlers;