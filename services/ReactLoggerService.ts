import winston from "winston";
var CONFIG = require("../config.json");

class ReactLoggerService {
  infoLogger: any;
  errorLogger: any;
  constructor() {
    var infoOptions = {
      file: {
        level: "info",
        filename: CONFIG.CLIENT_INFO_LOG_FILE,
        handleExceptions: true,
        json: true,
        maxsize: CONFIG.CLIENT_INFO_LOG_FILE_MAXSIZE,
        maxFiles: CONFIG.CLIENT_INFO_LOG_FILE_MAXFILES,
        colorize: false,
      },
    };

    this.infoLogger = winston.createLogger({
      transports: [new winston.transports.File(infoOptions.file)],
      exitOnError: false,
    });

    var errorOptions = {
      file: {
        level: "error",
        filename: CONFIG.CLIENT_ERROR_LOG_FILE,
        handleExceptions: true,
        json: true,
        maxsize: CONFIG.CLIENT_ERROR_LOG_FILE_MAXSIZE,
        maxFiles: CONFIG.CLIENT_ERROR_LOG_FILE_MAXFILES,
        colorize: false,
      },
    };

    this.errorLogger = winston.createLogger({
      transports: [new winston.transports.File(errorOptions.file)],
      exitOnError: false,
    });
  }

  async info(source: string, timestamp: string, message: string) {
    this.infoLogger.log({
      level: "info",
      source: source,
      timestamp: timestamp,
      message: message,
    });
  }

  async error(source: string, timestamp: string, error: string) {
    this.errorLogger.log({
      level: "error",
      source: source,
      timestamp: timestamp,
      error: error,
    });
  }
}

module.exports = ReactLoggerService;
