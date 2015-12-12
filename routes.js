function setup(app, handlers) {
  app.get('/v1/job', handlers.getJobQueue);
  app.get('/v1/job/:id', handlers.getJob);
  app.get('/v1/html/:url', handlers.getHtml);
  app.post('/v1/job/:url', handlers.createJob);
}

module.exports = setup;