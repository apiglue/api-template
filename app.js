const express = require('express');
const logger = require('./config/winston');

const app = express();
const processport = process.env.PORT;

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  require('dotenv').load();
  /* eslint-enable global-require */
}
app.use(require('morgan')('combined', { stream: logger.stream }));
// eslint-disable-next-line
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
