import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize } = winston.format;

// 로그 출력 형식 정의
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    // 콘솔 출력
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),

    // 파일 출력 - info 이상
    new DailyRotateFile({
      dirname: "logs",
      filename: "%DATE%-info.log",
      datePattern: "YYYY-MM-DD",
      level: "info",
      maxFiles: "10d",
      encoding: "utf8",
    }),

    // 파일 출력 - error만 별도 저장
    new DailyRotateFile({
      dirname: "logs",
      filename: "%DATE%-error.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "10d",
      encoding: "utf8",
    }),
  ],
});

// Logger Prefix Helper
export const createLogger = (prefix) => {
  return {
    info: (msg) => logger.info(`${prefix} ${msg}`),
    warn: (msg) => logger.warn(`${prefix} ${msg}`),
    error: (msg) => logger.error(`${prefix} ${msg}`),
    debug: (msg) => logger.debug(`${prefix} ${msg}`),
  };
};

export default logger;
