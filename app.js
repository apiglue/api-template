const express = require('express');
const logger = require('./config/winston');

const app = express();
const processport = process.env.PROCESS_PORT;

app.use(require('morgan')('combined', { stream: logger.stream }));

app.listen(processport, () => {
  logger.info(`Process up at port ${processport}`);
});

app.all('/*', (req, res) => {
  res.end(`process ${process.pid} says hello!`);
});

