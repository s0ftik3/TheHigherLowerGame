const buttons = require('../config/buttons.json');
const sendBugReport = require('../scripts/sendBugReport');

module.exports = () => (ctx) => {
    try {

        let greetings = ['Hey there', 'Hello', 'Hi', 'Howdy', 'Hey', 'How\'s going on', 'Sup', 'What\'s up', 'Greetings', 'Welcome'];
        let i = Math.floor(Math.random() * greetings.length);

        ctx.editMessageText(
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