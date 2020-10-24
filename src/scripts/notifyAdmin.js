const Telegram = require('telegraf/telegram');
const telegram = new Telegram(process.env.TOKEN);

module.exports = () => {
    telegram.sendSticker(process.env.ADMIN, 'CAACAgIAAxkBAAEBeIFfjFTcuk_U3i39MPFG9rtwmZOmGQACAQEAAladvQoivp8OuMLmNBsE');
    telegram.sendMessage(process.env.ADMIN, `🤩 *${bot.first_name}* bot has been started. Enjoy!`, { parse_mode: 'Markdown' });
}