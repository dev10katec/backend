const storage = require('@utils/storage')
const path = require('path')
const fs = require('fs')
const winston = require('winston')

class Logger {
  constructor() {
    this.logDirectory = storage.storagePath('logs')
    this.init()
  }

  init() {
    const dir = path.dirname(this.logDirectory)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    this.logger = winston.createLogger({
      level: this.getLogLevel(),
      levels: this.getLogLevels(),
      format: this.getLogFormat(),
      transports: this.getTransports()
    })

    winston.addColors(this.getLogColors())
  }

  getLogLevels() {
    return {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4
    }
  }

  getLogColors() {
    return {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'magenta',
      debug: 'white'
    }
  }

  getLogLevel() {
    const env = process.env.NODE_ENV || 'development'
    return env === 'development' ? 'debug' : 'warn'
  }

  getLogFormat() {
    return winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.colorize({ all: true }),
      winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    )
  }

  getTransports() {
    return [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: path.join(this.logDirectory, 'error.log'),
        level: 'error'
      }),
      new winston.transports.File({ filename: path.join(this.logDirectory, 'system.log') })
    ]
  }

  error(message) {
    this.logger.error(message)
  }

  warn(message) {
    this.logger.warn(message)
  }

  info(message) {
    this.logger.info(message)
  }

  http(message) {
    this.logger.http(message)
  }

  debug(message) {
    this.logger.debug(message)
  }
}

const logger = new Logger()
module.exports = logger
