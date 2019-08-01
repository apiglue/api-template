const http = require('http');
const logger = require('./config/winston');

const options = {
  timeout: 2000,
  host: 'localhost',
  port: process.env.PORT || 3000,
  path: '/health', // must be the same as HEALTHCHECK in Dockerfile
};

const request = http.request(options, (res) => {
  logger.info(`STATUS: ${res.statusCode}`);
  process.exitCode = (res.statusCode === 200) ? 0 : 1;
  process.exit();
});

request.on('error', (err) => {
  logger.error(`[healthcheck] ${err.status || 500} - ${err.message}`);
  process.exit(1);
});

request.end();
