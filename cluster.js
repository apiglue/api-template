// https://codeforgeek.com/2014/12/cluster-node-js-performance/
const cluster = require('cluster');
const numWorkers = require('os').cpus().length;
const logger = require('./config/winston');

if (process.env.NODE_ENV !== 'production') {
/* eslint-disable global-require */
  require('dotenv').load();
/* eslint-enable global-require */
}

if (cluster.isMaster) {
  logger.info(`Log level: ${logger.level}`);
  logger.info(`Master cluster setting up with ${numWorkers} workers`);

  for (let i = 0; i < numWorkers; i += 1) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    logger.info(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`Worker ${worker.process.pid} died with code:${code} and signal: ${signal}`);
    logger.info('Starting a new worker');
    cluster.fork();
  });
} else {
  /* eslint-disable global-require */
  require('./app.js');
  /* eslint-enable global-require */
}
