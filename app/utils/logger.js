// const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });

const dataLog = new Date().toLocaleDateString();

const timezoned = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Istanbul',
    });
}
const logger = createLogger({
  level: 'info',
  format:combine(
    timestamp({ format: timezoned }),
    myFormat
  ),
  defaultMeta: { service: 'to-do-list-service' },
  transports: [
    new transports.File({ filename: `./log/error.log ${dataLog}`, level: 'error' }),
    new transports.File({ filename: `./log/combined.log ${dataLog}` }),
  ],
});
exports.logger = logger;