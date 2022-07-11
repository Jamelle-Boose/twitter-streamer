import { createLogger, format, transports } from "winston"

const logger = createLogger({
  level: "info",
  format: format.json(),
  defaultMeta: { service: "twitter-streamer" },
  transports: [
    new transports.File({
      level: "error",
      filename: "error.log",
    }),
    new transports.File({
      level: "info",
      filename: "info.log",
    }),
  ],
})

export default logger
