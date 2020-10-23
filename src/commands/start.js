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
            } else { // and if not - add to the database

                // collect user's data
                let userId = ctx.from.id;
                let username = (ctx.from.username == undefined) ? 'none' : ctx.from.username;
                let lang = (ctx.from.language_code == undefined) ? 'none' : ctx.from.language_code;

                // make a record
                const userData = { id: userId, username: '@' + username, language: lang };
                const user = new User(userData);
                user.save();

            }
        }).catch(error => console.error(error));

        let greetings = ['Hey there', 'Hello', 'Hi', 'Howdy', 'Hey', 'How\'s going on', 'Sup', 'What\'s up', 'Greetings', 'Welcome'];
        let i = Math.floor(Math.random() * greetings.length);

        ctx.replyWithMarkdown(
            `👋 ${greetings[i]}, *${ctx.from.first_name}*!\n\n` + 
            `🎯 *Let's Get Started*\n` +
            `— Choose a game mode and try to guess a correct option. Your choice is only based on your opinion.`, {
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
        ctx.replyWithSticker('CAACAgIAAxkBAAEBeChfi9-CbY2kCc0BwOBgbhSEDk_VXQAC8wADVp29Cmob68TH-pb-GwQ');
        ctx.replyWithMarkdown('😵 *Oops... Something went wrong, please try again /start.*', { parse_mode: 'Markdown' });

    };
};