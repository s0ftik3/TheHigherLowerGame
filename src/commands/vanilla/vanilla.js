const TheHigerLowerGame = require('../../game/TheHigherLower');
const game = new TheHigerLowerGame();
const sendBugReport = require('../../scripts/sendBugReport');
const User = require('../../models/User');

module.exports = () => (ctx) => {
    try {

        // Game Data. Shorted in order to take less characters for inline buttons' callbacks
        let gd = game.start();
        // Structured data for callbacks
        let data = `${gd.first_title}/${gd.first_searches}/${gd.second_title}/${gd.second_searches}/${gd.correct}/0`;

        // Inline buttons (Yes or No, means it's either correct or wrong button)
        let higherBtn = `vaNo_${data}`;
        let lowerBtn = `vaNo_${data}`;

        // Message text
        let message = `🔵 *${gd.first_title}* — _${gd.first_searches} monthly searches_\n` +
        `⚪️ *${gd.second_title}*\n\n` +
        `*«${gd.second_title}»* has ❓ searches than *«${gd.first_title}»*.`;

        // Find correct option and make correct button correct again
        (gd.correct === 0) ? higherBtn = `vaYes_${data}` : lowerBtn = `vaYes_${data}`;

        // Finally, the bot's message
        ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '🔼 Higher', callback_data: higherBtn },
                        { text: '🔽 Lower', callback_data: lowerBtn },
                    ],
                ],
            },
            parse_mode: 'Markdown',
        });

        ctx.answerCbQuery();

        // Update used number
        User.find({ id: ctx.from.id }).then(user => {
            User.updateOne({ id: ctx.from.id }, { $set: { vanilla: { maxScore: user[0].vanilla.maxScore, used: user[0].vanilla.used + 1 } } }, () => {});
        }).catch(error => {
            // Delete inline buttons from previous message
            ctx.editMessageReplyMarkup({ inline_keyboard: [[]] });

            // Log error if something happened
            console.error(error);
            sendBugReport(error);
            
            // Let user know that something went wrong
            ctx.replyWithSticker('CAACAgIAAxkBAAEBeChfi9-CbY2kCc0BwOBgbhSEDk_VXQAC8wADVp29Cmob68TH-pb-GwQ');
            ctx.replyWithMarkdown('😵 *Oops... Something went wrong, I couldn\'t find your profile in our database. Please, try /start again.*', { parse_mode: 'Markdown' });
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