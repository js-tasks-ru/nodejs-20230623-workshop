require('dotenv').config({ path: 'secret.env' });

module.exports = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    YANDEX_FOLDER_ID: process.env.YANDEX_FOLDER_ID,
    YANDEX_IAM_TOKEN: process.env.YANDEX_IAM_TOKEN
}