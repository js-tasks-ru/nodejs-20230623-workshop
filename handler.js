const axios = require('axios');

const logger = require('./logger');

module.exports = async function handler(ctx) {
    logger.debug('message', ctx.message);

    const response = await axios.get('https://ru.wikipedia.org/w/api.php', {
        params: {
            action: 'query',
            titles: ctx.message.text,
            format: 'json',
            prop: 'extracts',
            exintro: '',
            explaintext: '',
            redirects: 1,
        }
    });

    const { pages } = response.data.query;

    logger.debug(`wikipedia search found: ${!pages['-1']}`);

    if (pages['-1']) {
        ctx.reply(`по вашему запросу ${ctx.message.text} в википедии ничего не найдено`);
        return;
    }

    const extract = pages[Object.keys(pages)[0]].extract;
    const text = extract.split('\n')[0];

    ctx.reply(text);
}