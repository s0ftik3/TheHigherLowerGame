const buttons = require('../config/buttons.json');
const config = require('../config/config.json');
const sendBugReport = require('../scripts/sendBugReport');

module.exports = () => (ctx) => {
    try {

        ctx.editMessageText(
            `🧐 *What is it all about?*\n` +
            `*«The Higher Lower»* game is a time-killer that has no purpose. Just play and share your success with other people. Check your knowledge of most trending things in the Internet.\n\n` +
            `🤖 *About the Bot*\n` +
            `The bot is written in JavaScript language via Telegraf framework. The bot's version is \`${config.version}\`. New features are coming soon! If you want to help with developing the bot, please report any bug you faced using a report button below.\n\n`, {
            reply_markup: {
                inline_keyboard: buttons.help,
            },
            parse_mode: 'Markdown',
        });

        ctx.answerCbQuery();

    } catch (error) {

        // Log error if something happened
        console.error(error);
        sendBugReport(error);
        // Let user know that something went wrong
        ctx.replyWithMarkdown('😵 *Oops... Something went wrong, please try again /start.*', { parse_mode: 'Markdown' });

    };
};