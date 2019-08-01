const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./config/winston');

const app = express();

const processport = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(require('morgan')('combined', {
  stream: logger.stream,
}));
// eslint-disable-next-line
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(err.status || 500);

  res.render('error');
});

app.listen(processport, () => {
  logger.info(`Process up at port ${processport}`);
});

app.get('/health', (req, res) => {
  res.json({
    id: `${process.pid}`,
    description: `${process.pid} PID says hello!`,
  });
});

// for testing
module.exports = app;
