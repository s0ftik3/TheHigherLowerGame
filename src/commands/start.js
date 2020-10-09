const User = require('../models/User');
const sendBugReport = require('../scripts/sendBugReport');
const findUser = require('../scripts/findUser');
const buttons = require('../config/buttons.json');

module.exports = () => async (i18n, ctx) => {
    try {

        // Check if there is such a user in database
        let isFound = await findUser(ctx.from.id).then(response => response).catch(error => console.error(error));
        if (!isFound) {
            const userData = { id: ctx.from.id, username: '@' + ctx.from.username, language: ctx.from.language_code };
            const user = new User(userData);
            user.save();
        }

        if (ctx.from.language_code === 'ru') {
            i18n.locale('ru');
            return ctx.replyWithMarkdown(i18n.t('greeting'));
        } else {
            i18n.locale('en');
            return ctx.replyWithMarkdown(i18n.t('greeting'));
        }

        // ctx.replyWithMarkdown(
        //     `👋 Hey there, *${ctx.from.first_name}*!\n\n` + 
        //     `🎯 *Let's Get Started*\n` +
        //     `— Tap on *Start the Game* button and enjoy the game. Try to guess a correct option and get +1 score. Your choice is only based on your opinion.`, {
        //     reply_markup: {
        //         inline_keyboard: buttons.main,
        //     },
        //     parse_mode: 'Markdown',
        // });

    } catch (error) {

        // Log error if something happened
        console.error(error);
        sendBugReport(error);
        // Let user know that something went wrong
        ctx.replyWithMarkdown('😵 *Oops... Something went wrong, please try again /start.*', { parse_mode: 'Markdown' });

    };
};