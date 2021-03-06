## MVP

- Write tests for routes
  - ~~POST to /v1/job/:id should respond 201~~
  - ~~GET to /v1/job/:id should respond 200~~
  - ~~GET to /v1/html/:url should respond 200~~
  - ~~GET to /v1/job should respond 200~~
  - ~~Everything else should respond 404~~
- ~~POST to /v1/job/:url should respond with useful information~~
- ~~POST should save something to database~~
- ~~POST should save correct info to database~~
- Pull out DB config (valueEncoding: 'json')
- Pull tests out into separate files

## Engineering Tasks

- ~~Create grunt tasks for linting, watching, etc...~~
- Root folder is getting kind of cluttered. Maybe factor out into subfolders soon
- Decide on 'schema'
- Create db.find() method and other helper methods

## Requirements

- Create a worker to fetch HTML from url and store in database
- Expose REST API for:
  - Adding jobs
  - Checking status/results