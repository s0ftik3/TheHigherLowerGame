const TheHigerLowerGame = require('../../game/TheHigherLower');
const game = new TheHigerLowerGame();
const sendBugReport = require('../../scripts/sendBugReport');

module.exports = () => async (ctx) => {
    try {

        // Game Data. Shorted in order to take less characters for inline buttons' callbacks
        let gd = game.start();
        // Structured data for callbacks
        let data = `${gd.first_title}/${gd.first_searches}/${gd.second_title}/${gd.second_searches}/${gd.correct}`;

        // Inline buttons (Yes or No, means it's either correct or wrong button)
        let higherBtn = `trNo_${data}`;
        let lowerBtn = `trNo_${data}`;

        // Message text
        let message = `🔵 *${gd.first_title}* — _${gd.first_searches} monthly searches_\n` +
        `⚪️ *${gd.second_title}*\n\n` +
        `*«${gd.second_title}»* has ❓ searches than *«${gd.first_title}»*.`;

        // Find correct option and make correct button correct again
        (gd.correct === 0) ? higherBtn = `trYes_${data}` : lowerBtn = `trYes_${data}`;

        // The bot's message
        ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '🔼', callback_data: higherBtn },
                        { text: '🔽', callback_data: lowerBtn },
                    ],
                ],
            },
            parse_mode: 'Markdown',
        });

        ctx.answerCbQuery();

    } catch (error) {

        // Log error if something happened
        console.error(error);
        sendBugReport(error);
        // Let user know that something went wrong
        ctx.replyWithSticker('CAACAgIAAxkBAAEBeChfi9-CbY2kCc0BwOBgbhSEDk_VXQAC8wADVp29Cmob68TH-pb-GwQ');
        ctx.replyWithMarkdown('😵 *Oops... Something went wrong, please try again /start.*', { parse_mode: 'Markdown' });

    };
};