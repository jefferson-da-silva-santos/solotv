import winston from "winston";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const caminhoLog = path.join(__dirname, "../logs/app.log");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD/MM/YYYY HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: caminhoLog,
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.Console({
      format: winston.format.colorize({ all: true }),
    }),
  ],
});

export default logger;