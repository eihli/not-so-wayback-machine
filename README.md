# Massdrop Coding Challenge

## The Not So Wayback Machine

Create a job queue whose workers fetch data from a URL and store the results in a database. The job queue should expose a REST API for adding jobs and checking their status/results.

Example: User submits www.google.com to your endpoint. The user gets back a job id. Your system fetches www.google.com (the result of which would be HTML) and stores the result. The user asks for the status of the job id and if the job is complete, he gets a response that includes the HTML for www.google.com.

Use any tech you want. Put the code in a gist or on GitHub.

## Initial Design Thoughts

- Simple file DB like LevelDB. No need for more. Lookups will be slow since we will be accessing sites by either job_id or url and never by whatever UUID we store them in the DB as. Could create an interface so the database can be changed later. 
- TDD the back-end and integration test the API in isolation of the front-end.
- Cron job or setTimeout for the worker?

## API

### `GET /v1/job/:id`

Retrieve object representing job.

    {
      "job_id": "000001",
      "url": "www.google.com",
      "status": "complete", // pending, aborted
      "html": "<html>...</html>"
    }

### `GET /v1/job`

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

### `GET /v1/site/:url`

Retrieve HTML for site.

    {
      "job_id": "000001",
      "url": "www.google.com",
      "status": "complete", // pending, etc...
      "html": "<html>...</html>"
    }

### `POST /v1/job/:url`

Create new job.

TODO: What if you POST a url that is already completed? Should we timestamp these? Overwrite the old one?

    {
      "job_id": "000002"
    }