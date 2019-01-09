import { createLogger, format, transports } from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'
import config = require('../../config')

const { combine, timestamp, label, printf, prettyPrint } = format

const myFormat = printf((info) => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${JSON.stringify(info.message)}`
})

const logger = createLogger({
  format: combine(
    label({ label: 'WITHYOUFRIENDS' }),
    timestamp(),
    myFormat,
    format.colorize({ all: true }),
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: `${config.log.path}/application-%DATE%.log`,
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
})

export default logger
