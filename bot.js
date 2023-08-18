const { Telegraf } = require('telegraf');

const config = require('./config');

const bot = new Telegraf(config.BOT_TOKEN);

bot.start((ctx) => ctx.reply('привет'));

bot.on('text', (ctx) => ctx.reply('привет'));

module.exports = bot;