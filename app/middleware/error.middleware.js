const winston = require("../utils/logger");
const errorMiddleware = ((error, req, res, next) => {
    const errorLog = `${error.status || 500} ${error.stack}`;
    winston.logger.log('error', errorLog);
    res.status(error.status || 500);
    res.json({
      status: error.status,
      message: error.message,
      // stack: error.stack
    });
    console.log('Error status: ', error.status)
    console.log('Message: ', error.message)
  });
  module.exports = errorMiddleware;