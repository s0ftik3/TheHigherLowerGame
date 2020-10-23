const startCommand = require('./start');
const gameCommand = require('./game');
const nextCommand = require('./next');
const correctCommand = require('./correct');
const wrongCommand = require('./wrong');
const stopCommand = require('./stop');
const helpCommand = require('./help');
const backCommand = require('./back');
const vanillaCommand = require('./vanilla');
const vanillaCorrectCommand = require('./vanillaCorrect');
const vanillaWrongCommand = require('./vanillaWrong');
const vanillaCancelCommand = require('./vanillaCancel');

module.exports = {
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
}