const { Telegraf } = require('telegraf');

const config = require('./config');
const handler = require('./handler');
const logger = require('./logger');

const bot = new Telegraf(config.BOT_TOKEN);

if (config.BOT_WEBHOOK_URL) {
    bot.startWebhook(config.BOT_WEBHOOK_URL, null, config.PORT);
}

bot.catch((err, ctx) => {
    logger.error(err);
    ctx.reply('к сожалению, произошла ошибка при обработке вашего сообщения');
})

bot.start((ctx) => ctx.reply('привет'));

bot.on('text', handler);

module.exports = bot;