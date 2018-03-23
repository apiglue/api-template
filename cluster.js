// https://codeforgeek.com/2014/12/cluster-node-js-performance/
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const winston = require('winston');

winston.level = process.env.LOG_LEVEL;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach((id) => {
    winston.log('info ', 'Worker spun with PID', {
      workerId: cluster.workers[id].process.pid,
    });
  });

  cluster.on('exit', (worker, code, signal) => {
    winston.log('warn', 'Worker died - PID', {
      workerId: worker.process.pid,
    });
  });
} else {
  // Do further processing.
   require('./app.js');
}
