const { Telegraf } = require('telegraf');

const config = require('./config');
const handler = require('./handler');

const bot = new Telegraf(config.BOT_TOKEN);

bot.start((ctx) => ctx.reply('привет'));

bot.on('text', handler);

module.exports = bot;