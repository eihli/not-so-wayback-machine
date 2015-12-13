# The Not So Wayback Machine

Create a job queue whose workers fetch data from a URL and store the results in a database. The job queue should expose a REST API for adding jobs and checking their status/results.

Example: User submits www.google.com to your endpoint. The user gets back a job id. Your system fetches www.google.com (the result of which would be HTML) and stores the result. The user asks for the status of the job id and if the job is complete, he gets a response that includes the HTML for www.google.com.

## Initial Design Thoughts

- Simple file DB like LevelDB. No need for more. Lookups will be slow since we will be accessing sites by either job_id or url and never by whatever UUID we store them in the DB as. Could create an interface so the database can be changed later. 
- TDD the back-end and integration test the API in isolation of the front-end.
- Cron job or setTimeout for the worker?

## API

### `GET /v1/html/:url`

Retrieve job.

Returns:

    {
      "key": "d5f5b850-a134-11e5-afeb-77f3a90da967", // uuid.v1()
      "value": {
        "url": "www.google.com",
        "status": "completed", // completed | pending
        "html": "<!DOCTYPE html>...</html>",
        "created_at": 1449968400470,
        "fetched_at": 1449968402017
      }
    }

### `POST /v1/job/:url`

Create new job.

Returns:

    {
      "key": "d5f5b850-a134-11e5-afeb-77f3a90da967", // uuid.v1()
      "value": {
        "url": "www.google.com",
        "status": "pending", // completed | pending
        "html": null,
        "created_at": 1449968400470,
        "fetched_at": null
      }
    }

Pending URLs will be fetched on a set interval.

### `GET /v1/job/:id`

Returns same object as `GET /v1/html/url` but is a faster lookup. In the future if we handle archiving multiple versions of the HTML, then the /html/url route should give us the latest and this route should give us a specific version of it.

Retrieve object representing job.

    {
      "key": "d5f5b850-a134-11e5-afeb-77f3a90da967", // uuid.v1()
      "value": {
        "url": "www.google.com",
        "status": "completed", // completed | pending
        "html": "<!DOCTYPE html>...</html>",
        "created_at": 1449968400470,
        "fetched_at": 1449968402017
      }
    }

### `GET /v1/job` **Not Implemented**

Retrieve list of pending jobs.

    [
      {
        "job_id": "000001",
        "url": "www.google.com",
        "status": "pending"
      },
      {
        "job_id": "000002",
        "url": "www.yahoo.com",
        "status": "pending"
      }
    ]