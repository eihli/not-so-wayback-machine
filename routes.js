function setup(app, handlers) {
  app.get('/v1/job', handlers.getJobQueue); // TODO: Implement
  app.get('/v1/job/:id', handlers.getJob); // TODO: Implement
  app.get('/v1/html/:url', handlers.getHtml);
  app.post('/v1/job/:url', handlers.createJob);
}

module.exports = setup;