const User = require('../models/User');
const sendBugReport = require('../scripts/sendBugReport');

module.exports = () => (ctx) => {
    try {

        // Receive and split received data
        let data = ctx.callbackQuery.data.replace(/yes_/g, '');
        let arr = data.split('/');

        // Message text
        let message = `🔵 *${arr[0]}* _(${arr[1]} monthly searches)_\n` + 
        `🔴 *${arr[2]}* _(${arr[3]} monthly searches)_\n\n` +
        `*${arr[2]}* has *${arr[4] > 0 ? `🔽 LOWER` : `🔼 HIGHER`}* searches than *${arr[0]}, you answered ✅ correct!*`;

        // Reply user
        ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '⬅️ Menu', callback_data: 'cancel' },{ text: 'Next ➡️', callback_data: 'next' }]
                ],
            }, parse_mode: 'Markdown'
        })
    
        // Notify user
        ctx.answerCbQuery('✅ Your answered correct!');

        // Update correct answers
        User.find({ id: ctx.from.id }).then(user => {
            User.updateOne({ id: ctx.from.id }, { $set: { answers: { correct: user[0].answers.correct + 1, wrong: user[0].answers.wrong  } } }, () => {});
        }).catch(error => {
            // Delete inline buttons from previous message
            ctx.editMessageReplyMarkup({ inline_keyboard: [[]] });

            // Log error if something happened
            console.error(error);
            sendBugReport(error);

            // Let user know that something went wrong
            ctx.replyWithMarkdown('😵 *Oops... Something went wrong, I can\'t find your profile in our database. Please, try again /start.*', { parse_mode: 'Markdown' });
        });

    } catch (error) {

        // Log error if something happened
        console.error(error);
        sendBugReport(error);
        // Let user know that something went wrong
        ctx.replyWithMarkdown('😵 *Oops... Something went wrong, please try again /start.*', { parse_mode: 'Markdown' });

    };
};