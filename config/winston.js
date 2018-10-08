const appRoot = require('app-root-path');
const winston = require('winston');


/* eslint-disable no-unused-expressions */
require('winston-papertrail').Papertrail;
/* eslint-enable no-unused-expressions */

const tsFormat = () => (new Date()).toLocaleTimeString();

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
    json: true,
    colorize: true,
    timestamp: tsFormat,
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(options.console),
  ],
});

if (process.env.NODE_ENV === 'dev') {
  logger.add(new winston.transports.File(options.file));
}
if (process.env.NODE_ENV === 'prd') {
  if (process.env.PPT_HOST !== '' && process.env.PPT_PORT !== '') {
    const winstonPapertrail = new winston.transports.Papertrail({
      host: process.env.PPT_HOST,
      port: process.env.PPT_PORT,
    });


    winstonPapertrail.on('error', (err) => { // eslint-disable-line no-unused-vars
      // Handle, report, or silently ignore connection errors and failures
    });
    logger.add(winstonPapertrail);
  } else {
    logger.crit('Papertrail envirment not set');
  }
}
// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
