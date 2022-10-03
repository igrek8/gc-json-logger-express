# [Structured logging](https://cloud.google.com/logging/docs/structured-logging) for express.js app in GKE

[![NPM](https://badgen.net/npm/v/gc-json-logger-express)](https://www.npmjs.com/gc-json-logger-express)
[![Coverage Status](https://coveralls.io/repos/github/igrek8/gc-json-logger-express/badge.svg?branch=main)](https://coveralls.io/github/igrek8/gc-json-logger-express?branch=main)
![Health](https://badgen.net/github/checks/igrek8/gc-json-logger-express)
![License](https://badgen.net/github/license/igrek8/gc-json-logger-express)
[![Runkit](https://badgen.net/badge/runkit/playground/cyan)](https://npm.runkit.com/gc-json-logger-express)

## Precaution

The logger makes use of [`async_hooks`](https://nodejs.org/api/async_hooks.html#async-hooks) module which is currently **experimental**. However, the use of `async_hooks` mechanism was at basic.

## Installation

```bash
npm install --save gc-json-logger gc-json-logger-express

yarn add gc-json-logger gc-json-logger-express
```

## View in Google Cloud Logging

![Google Cloud Logging](./docs/images/google-cloud-logging.png)

## Integration

```js
const { Logger, Severity } = require('gc-json-logger');
const { log } = require('gc-json-logger-express');
const express = require('express');

const app = express();

/* Set desired application log level */
Logger.setLevel(Severity.DEBUG);

/* Filter sensitive data or transform log entry */
app.use(
  log((_req, _res, entry) => {
    const severity = entry.meta.httpRequest?.status >= 500 ? Severity.ERROR : entry.severity;
    return { ...entry, severity };
  })
);

app.use(express.text());
app.use(express.json());
app.use((req, res) => res.status(500).send(req.body));

app.listen(3000);
```

### Mock Request

```bash
curl -X POST "http://localhost:3000/echo" \
  -H "Content-Type: text/plain" \
  -d 'Hello world!'
```

### Logged Request

```json
{
  "severity": "INFO",
  "timestamp": "2022-01-01T00:00:00.000Z",
  "message": "200 POST /echo",
  "httpRequest": {
    "protocol": "HTTP/1.1",
    "requestSize": "141",
    "remoteIp": "::ffff:127.0.0.1",
    "requestUrl": "http://localhost:3000/echo",
    "requestMethod": "POST",
    "userAgent": "curl/7.79.1",
    "serverIp": "::ffff:127.0.0.1:3000"
  },
  "logging.googleapis.com/operation": {
    "id": "135af3bd-1cde-4b72-92ac-3106e7514714"
  }
}
```

### Logged Request and Response

```json
{
  "severity": "ERROR",
  "timestamp": "2022-01-01T00:00:00.000Z",
  "message": "500 POST /echo (13ms)",
  "httpRequest": {
    "latency": "13ms",
    "responseSize": "258",
    "status": 500
  },
  "logging.googleapis.com/operation": {
    "id": "135af3bd-1cde-4b72-92ac-3106e7514714"
  },
  "meta": {
    "request": {
      "headers": {
        "host": "localhost:3000",
        "user-agent": "curl/7.79.1",
        "accept": "*/*",
        "content-type": "text/plain",
        "content-length": "12"
      },
      "body": "Hello world!"
    },
    "response": {
      "headers": {
        "x-powered-by": "Express",
        "content-type": "text/html; charset=utf-8",
        "content-length": "12",
        "etag": "W/\"c-00hq6RNueFa8QiEjhep5cJRHWAI\""
      },
      "body": "Hello world!"
    }
  }
}
```
