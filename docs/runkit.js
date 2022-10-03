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
