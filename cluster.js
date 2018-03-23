// https://codeforgeek.com/2014/12/cluster-node-js-performance/
const cluster = require('cluster');
const numWorkers = require('os').cpus().length;
const logger = require('./config/winston');

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
  // Do further processing.
  require('./app.js');
}
