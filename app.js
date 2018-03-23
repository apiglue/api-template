const express = require('express');
const winston = require('winston');

const app = express();
const processport = process.env.PROCESS_PORT;
winston.level = process.env.LOG_LEVEL;

app.get('/', (req, res) => {
  res.end("Hello world !");
});

app.listen(processport, () => {
  winston.log('info', 'Process up at port', {
    processPort: processport,
  });
});
