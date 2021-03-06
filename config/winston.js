const winston = require('winston');
const path = require('path');

const logDir = 'logs'; // directory path you want to set

const tsFormat = () => (new Date()).toLocaleTimeString();

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {
    service: 'user-service',
  },
  transports: [

    new winston.transports.File({
      filename: path.join(logDir, '/error.log'),
      json: true,
      level: 'error',
      timestamp: tsFormat,
    }),
    new winston.transports.File({
      filename: path.join(logDir, '/app.log'),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
    timestamp: tsFormat,
  }));
}
// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
