const winston = require('winston')
const { combine, timestamp, label, printf } = winston.format

const format = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
})

const levels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    success: 3,
    debug: 4
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    success: 'green',
    debug: 'grey'
  }
}

const logger = winston.createLogger({
  level: 'success',
  levels: levels.levels,
  format: combine(
    winston.format.colorize(),
    label({ label: 'FriendEm' }),
    timestamp({
      format: 'HH:mm:ss'
    }),
    format
  ),
  transports: [new winston.transports.Console()]
})
winston.addColors(levels.colors)

module.exports = logger
