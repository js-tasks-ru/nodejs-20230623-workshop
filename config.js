require('dotenv').config({ path: 'secret.env' });

module.exports = {
    PORT: process.env.PORT,
    BOT_TOKEN: process.env.BOT_TOKEN,
    BOT_WEBHOOK_URL: process.env.BOT_WEBHOOK_URL,
    YANDEX_FOLDER_ID: process.env.YANDEX_FOLDER_ID,
    YANDEX_IAM_TOKEN: process.env.YANDEX_IAM_TOKEN,
}