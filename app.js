const express = require('express');
const logger = require('./config/winston');

const app = express();
const processport = process.env.PORT;

// eslint-disable-line global-require
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

app.use(require('morgan')('combined', { stream: logger.stream }));

app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(err.status || 500);

  res.render('error');
});

app.listen(processport, () => {
  logger.info(`Process up at port ${processport}`);
});

app.get('/pid', (req, res) => {
  res.end(`process ${process.pid} says hello!`);
});

// for testing
module.exports = app;
