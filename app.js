// Connect telegraf framework
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN);

const path = require('path');
const TelegrafI18n = require('telegraf-i18n');
const i18n = new TelegrafI18n({
    defaultLanguage: 'en',
    allowMissing: false, // Default true
    directory: path.resolve(__dirname, 'locales')
});

const { Extra } = telegraf;

// Connect database
const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    return console.log('Connected to the database.')
})

// Important commands
const {
    startCommand,
    gameCommand,
    nextCommand,
    correctCommand,
    wrongCommand,
    stopCommand,
    helpCommand,
    backCommand
} = require('./src/commands');

bot.use(i18n.middleware());

// Bot's body
bot.start(startCommand());

bot.action('start', gameCommand());
bot.action('next', nextCommand());
bot.action('cancel', stopCommand());
bot.action('help', helpCommand());
bot.action('back', backCommand());
bot.action(/yes-*\w+/, correctCommand());
bot.action(/no-*\w+/, wrongCommand());

// Solves the problem with stucked loader next to the inline buttons
bot.on('callback_query', (ctx) => ctx.answerCbQuery());

// Indicates that the bot has been started
bot.telegram.getMe().then((bot) => {
    console.log(`${bot.first_name} bot has been started. Enjoy!`);
});

// Start the bot
bot.startPolling();