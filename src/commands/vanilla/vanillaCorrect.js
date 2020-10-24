const TheHigerLowerGame = require('../../game/TheHigherLower');
const game = new TheHigerLowerGame();
const sendBugReport = require('../../scripts/sendBugReport');
const numeral = require('numeral');

module.exports = () => (ctx) => {
    try {

        // Receive and split received data
        let arrData = ctx.callbackQuery.data.replace(/vaYes_/g, '');
        // Where 0 - first title, 1 - first volume, 2 - second title, 3 - second volume and 4 - correct option
        let arr = arrData.split('/');

        // Game Data. Shorted in order to take less characters for inline buttons' callbacks
        let gd = game.start();
        // Structured data for callbacks
        let data = `${arr[2]}/${arr[3]}/${gd.second_title}/${gd.second_searches}/${gd.correct}/` + (Number(arr[5]) + 1);

        // Inline buttons (Yes or No, means it's either correct or wrong button)
        let higherBtn = `vaNo_${data}`;
        let lowerBtn = `vaNo_${data}`;

        // Message text
        let message = `🧮 *Your score —* _${Number(arr[5]) + 1}_\n\n` +
        `🔵 *${arr[2]}* — _${arr[3]} monthly searches_\n` +
        `⚪️ *${gd.second_title}*\n\n` +
        `*«${gd.second_title}»* has ❓ searches than *«${arr[2]}»*.\n\n`;

        // Find correct option and make correct button correct again
        (numeral(arr[3]) < numeral(gd.second_searches)) ? higherBtn = `vaYes_${data}` : lowerBtn = `vaYes_${data}`;

        console.log(`${numeral(arr[3])} < ${numeral(gd.second_searches)} = ${numeral(arr[3]) < numeral(gd.second_searches)}`);

        console.log(higherBtn);
        console.log(lowerBtn);

        // Reply user
        ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '🔼', callback_data: higherBtn },
                        { text: '🔽', callback_data: lowerBtn },
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