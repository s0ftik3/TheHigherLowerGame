// Connect telegraf framework
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN);
const Telegram = require('telegraf/telegram');
const telegram = new Telegram(process.env.TOKEN);

// Connect database
const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    return console.log('Connected to the database.');
});

// Important commands
const {
    startCommand,
    gameCommand,
    nextCommand,
    correctCommand,
    wrongCommand,
    stopCommand,
    helpCommand,
    backCommand,
    vanillaCommand,
    vanillaCorrectCommand,
    vanillaWrongCommand,
    vanillaCancelCommand
} = require('./src/commands');

// Bot's body
bot.start(startCommand());

bot.action('start', gameCommand());
bot.action('next', nextCommand());
bot.action('cancel', stopCommand());
bot.action('help', helpCommand());
bot.action('back', backCommand());
bot.action(/yes-*\w+/, correctCommand());
bot.action(/no-*\w+/, wrongCommand());
bot.action('vanilla', vanillaCommand());
bot.action(/vup-*\w+/, vanillaCorrectCommand());
bot.action(/vdown-*\w+/, vanillaWrongCommand());
bot.action('vcancel', vanillaCancelCommand());

// Solves the problem with stucked loader next to the inline buttons
bot.on('callback_query', (ctx) => ctx.answerCbQuery());

// Indicates that the bot has been started
bot.telegram.getMe().then((bot) => {
    console.log(`${bot.first_name} bot has been started. Enjoy!`);
    telegram.sendSticker(process.env.ADMIN, 'CAACAgIAAxkBAAEBeIFfjFTcuk_U3i39MPFG9rtwmZOmGQACAQEAAladvQoivp8OuMLmNBsE');
    telegram.sendMessage(process.env.ADMIN, `🤩 *${bot.first_name}* bot has been started. Enjoy!`, { parse_mode: 'Markdown' });
});

// Start the bot
bot.startPolling();