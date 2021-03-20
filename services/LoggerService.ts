import winston from "winston";
var CONFIG = require("../config.json");

const dateFormat = () => {
  return new Date(Date.now()).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
};
class LoggerService {
  infoLogger: any;
  errorLogger: any;
  source: string;
  constructor(source: string) {
    this.source = source;
    var infoOptions = {
      file: {
        level: "info",
        filename: CONFIG.SERVER_INFO_LOG_FILE,
        handleExceptions: true,
        json: true,
        maxsize: CONFIG.SERVER_INFO_LOG_FILE_MAXSIZE,
        maxFiles: CONFIG.SERVER_INFO_LOG_FILE_MAXFILES,
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
        filename: CONFIG.SERVER_ERROR_LOG_FILE,
        handleExceptions: true,
        json: true,
        maxsize: CONFIG.SERVER_ERROR_LOG_FILE_MAXSIZE,
        maxFiles: CONFIG.SERVER_ERROR_LOG_FILE_MAXFILES,
        colorize: false,
      },
    };

    this.errorLogger = winston.createLogger({
      transports: [new winston.transports.File(errorOptions.file)],
      exitOnError: false,
    });
  }

  async info(message: string) {
    this.infoLogger.log({
      level: "info",
      source: this.source,
      timestamp: dateFormat(),
      message: message,
    });
  }

  async error(error: any) {
    this.errorLogger.log({
      level: "error",
      source: this.source,
      timestamp: dateFormat(),
      message: error,
    });
  }
}

module.exports = LoggerService;
