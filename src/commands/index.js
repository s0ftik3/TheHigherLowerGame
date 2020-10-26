const startCommand = require('./start');
const gameCommand = require('./trivia/game');
const nextCommand = require('./trivia/next');
const correctCommand = require('./trivia/correct');
const wrongCommand = require('./trivia/wrong');
const stopCommand = require('./trivia/stop');
const backCommand = require('./vanilla/back');
const vanillaCommand = require('./vanilla/vanilla');
const vanillaCorrectCommand = require('./vanilla/vanillaCorrect');
const vanillaWrongCommand = require('./vanilla/vanillaWrong');
const vanillaCancelCommand = require('./vanilla/vanillaCancel');

module.exports = {
    startCommand,
    gameCommand,
    nextCommand,
    correctCommand,
    wrongCommand,
    stopCommand,
    backCommand,
    vanillaCommand,
    vanillaCorrectCommand,
    vanillaWrongCommand,
    vanillaCancelCommand
}