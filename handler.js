const axios = require('axios');

const logger = require('./logger');
const config = require('./config');

module.exports = async function handler(ctx) {
    logger.debug('message', ctx.message);

    const wikiReponse = await axios.get('https://ru.wikipedia.org/w/api.php', {
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

    const { pages } = wikiReponse.data.query;

    logger.debug(`wikipedia search found: ${!pages['-1']}`);

    if (pages['-1']) {
        ctx.reply(`по вашему запросу ${ctx.message.text} в википедии ничего не найдено`);
        return;
    }

    const extract = pages[Object.keys(pages)[0]].extract;
    const text = extract.split('\n')[0];

    const yaResponse = await axios.post('https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize', new URLSearchParams({
        text,
        lang: 'ru-RU',
        voice: 'omazh',
        emotion: 'evil',
        speed: 1,
        format: 'oggopus',
        folderId: config.YANDEX_FOLDER_ID,
    }), {
        headers: {
            Authorization: `Bearer ${config.YANDEX_IAM_TOKEN}`
        },
        responseType: 'arraybuffer',
    }).catch(err => {
        if (err.response) throw err.response.data.toString();
        throw err;
    });

    ctx.sendVoice({source: yaResponse.data, filename: ctx.message.text});
}