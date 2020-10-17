const User = require('../models/User');
const sendBugReport = require('../scripts/sendBugReport');
const findUser = require('../scripts/findUser');
const buttons = require('../config/buttons.json');

module.exports = () => async (ctx) => {
    try {

        // Check if there is such a user in database
        await findUser(ctx.from.id).then(response => {
            if (response) {
                return;
            } else {
                const userData = { id: (ctx.from.id ?? 'None'), username: '@' + (ctx.from.username ?? 'None'), language: (ctx.from.language_code ?? 'None') };
                const user = new User(userData);
                user.save();
            }
        }).catch(error => console.error(error));

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