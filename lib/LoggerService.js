"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
var CONFIG = require("../config.json");
const dateFormat = () => {
    return new Date(Date.now()).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
    });
};
class LoggerService {
    constructor(source) {
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
        this.infoLogger = winston_1.default.createLogger({
            transports: [new winston_1.default.transports.File(infoOptions.file)],
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
        this.errorLogger = winston_1.default.createLogger({
            transports: [new winston_1.default.transports.File(errorOptions.file)],
            exitOnError: false,
        });
    }
    info(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.infoLogger.log({
                level: "info",
                source: this.source,
                timestamp: dateFormat(),
                message: message,
            });
        });
    }
    error(error) {
        return __awaiter(this, void 0, void 0, function* () {
            this.errorLogger.log({
                level: "error",
                source: this.source,
                timestamp: dateFormat(),
                message: error,
            });
        });
    }
}
module.exports = LoggerService;
//# sourceMappingURL=LoggerService.js.map