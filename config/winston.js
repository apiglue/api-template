const appRoot = require('app-root-path');
const winston = require('winston');

const tsFormat = () => (new Date()).toLocaleTimeString();

// define the custom settings for each transport (file, console)
const options = {
  file: {
    timestamp: tsFormat,
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    // timestamp: tsFormat,
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(options.console),
  ],
});

if (process.env.NODE_ENV === 'development') {
  logger.add(new winston.transports.File(options.file));
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
