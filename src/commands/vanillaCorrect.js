const TheHigerLowerGame = require('../game/TheHigherLower');
const game = new TheHigerLowerGame();
const sendBugReport = require('../scripts/sendBugReport');

module.exports = () => (ctx) => {
    try {

        // Receive and split received data
        let data = ctx.callbackQuery.data.replace(/vyes_/g, '');
        // Where 0 - first title, 1 - first volume, 2 - second title, 3 - second volume and 4 - correct option
        let arr = data.split('/');

        // Game Data. Shorted in order to take less characters for inline buttons' callbacks
        let gd = game.start();
        // Structured data for callbacks
        let data = `${gd.first_title}/${gd.first_searches}/${gd.second_title}/${gd.second_searches}/${gd.correct}/` + (Number(arr[5]) + 1);

        // Inline buttons (Yes or No, means it's either correct or wrong button)
        let higherBtn = `vno_${data}`;
        let lowerBtn = `vno_${data}`;

        // Message text
        let message = `🔵 *${gd.first_title}* — _${gd.first_searches} monthly searches_\n` +
        `⚪️ *${gd.second_title}*\n\n` +
        `*«${gd.second_title}»* has ❓ searches than *«${gd.first_title}»*.\n\n` +
        `Your score: ${Number(arr[5]) + 1}`;

        // Find correct option and make correct button correct again
        (gd.correct === 0) ? higherBtn = `vyes_${data}` : lowerBtn = `vyes_${data}`;

        // Reply user
        ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '🔼 Higher', callback_data: higherBtn },
                        { text: '🔽 Lower', callback_data: lowerBtn },
                    ],
                ],
            }, parse_mode: 'Markdown'
        })
    
        // Notify user
        ctx.answerCbQuery('✅ Your answered correct!');

    } catch (error) {

        // Log error if something happened
        console.error(error);
        sendBugReport(error);
        // Let user know that something went wrong
        ctx.replyWithSticker('CAACAgIAAxkBAAEBeChfi9-CbY2kCc0BwOBgbhSEDk_VXQAC8wADVp29Cmob68TH-pb-GwQ');
        ctx.replyWithMarkdown('😵 *Oops... Something went wrong, please try again /start.*', { parse_mode: 'Markdown' });

    };
};