const User = require('../../models/User');
const sendBugReport = require('../../scripts/sendBugReport');
const numeral = require('numeral');

module.exports = () => (ctx) => {
    try {

        // Receive and split received data
        let data = ctx.callbackQuery.data.replace(/vaNo_/g, '');
        // Where 0 - first title, 1 - first volume, 2 - second title, 3 - second volume and 4 - correct option
        let arr = data.split('/');

        let a = numeral(arr[3]);
        let b = numeral(gd.second_searches);

        // Message text
        let message = `💩 *Game Over! ⭐️ Score —* _${arr[5]}_\n\n` +
        `🔵 *${arr[0]}* — _${arr[1]} monthly searches_\n` +
        `⚪️ *${arr[2]}* — _${arr[3]} monthly searches_\n\n` +
        `*«${arr[2]}»* has *${a._value < b._value ? `🔼 HIGHER` : `🔽 LOWER`}* searches than *«${arr[0]}»*.\n\n`;

        // Reply user
        ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '⬅️ Menu', callback_data: 'vaCancel' }]
                ],
            }, parse_mode: 'Markdown'
        })
    
        // Notify user
        ctx.answerCbQuery('❌ Your answered wrong!');

        // Update wrong answers
        User.find({ id: ctx.from.id }).then(user => {
            User.updateOne({ id: ctx.from.id }, { $set: { vanilla: { maxScore: (Number(arr[5]) >= user[0].vanilla.maxScore) ? Number(arr[5]) : user[0].vanilla.maxScore, used: user[0].vanilla.used } } }, () => {});
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