const Telegram = require('telegraf/telegram');
const telegram = new Telegram(process.env.TOKEN);

module.exports = (error) => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hour = Number(date.getHours()) + 6;
    let min = date.getMinutes();

    let message = `*Name:* ${error.name}\n*Message:* ${error.message}\n*Date:* ${day}/${month}/${year} ${hour}:${min}`;
    telegram.sendMessage(process.env.ADMIN, message, { parse_mode: 'Markdown' });
}