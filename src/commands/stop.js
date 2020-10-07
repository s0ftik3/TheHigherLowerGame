const buttons = require('../config/buttons.json');
const sendBugReport = require('../scripts/sendBugReport');

module.exports = () => (ctx) => {
    try {

        ctx.editMessageReplyMarkup({ inline_keyboard: [[]] });

        ctx.replyWithMarkdown(
            `👋 Hey there, *${ctx.from.first_name}*!\n\n` + 
            `🎯 *Let's Get Started*\n` +
            `— Tap on *Start the Game* button and enjoy the game. Try to guess a correct option and get +1 score. Your choice is only based on your opinion.`, {
            reply_markup: {
                inline_keyboard: buttons.main,
            },
            parse_mode: 'Markdown',
        });

    } catch (error) {

        // Log error if something happened
        console.error(error);
        sendBugReport(error);
        // Let user know that something went wrong
        ctx.replyWithMarkdown('😵 *Oops... Something went wrong, please try again /start.*', { parse_mode: 'Markdown' });

    };
};