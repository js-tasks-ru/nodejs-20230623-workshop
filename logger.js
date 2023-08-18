const winston = require('winston');

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: 'telegram-bot' },
    transports: [
        new winston.transports.Console()
    ],
});

module.exports = logger;