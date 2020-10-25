const data = require('./database/data.json');
const removeBugSymbols = require('../scripts/removeBugSymbols');
const numeral = require('numeral');

class TheHigherLowerGame {

    /**
     * Checks if two values equal or not
     * @public
     * @param {Number} firstValue volume of the first trend
     * @param {Number} secondValue volume of the second trend
     */
    checkEqualness(firstValue, secondValue) {
        return (firstValue === secondValue) ? true : false;
    }

    /**
     * Collect data into one object and return it
     * @public
     */
    collectData() {

        // Generate two random numbers
        let i = Math.floor(Math.random() * data.length);
        let j = Math.floor(Math.random() * data.length);

        // Check if two trends have the same volume
        if (this.checkEqualness(data[i].searchVolume, data[j].searchVolume)) {
            return this.collectData();
        };

        // Collect all data into one object
        let result = {
            first_title: removeBugSymbols(data[i].keyword),
            first_searches: numeral(data[i].searchVolume).format('0.0a'),
            second_title: removeBugSymbols(data[j].keyword),
            second_searches: numeral(data[j].searchVolume).format('0.0a'),
            correct: (data[i].searchVolume > data[j].searchVolume) ? 1 : 0,
            explanation: `${removeBugSymbols(data[i].keyword)} has ${removeBugSymbols(data[j].keyword)} searches per month.`
        };

        // Return data
        return result;

    }

    /**
     * Start The Higher Lower game
     * @public
     */
    start() {

        return this.collectData();
        
    }

    vanillaCollectData(pre_title, pre_searches) {

        // Generate two random numbers
        let i = Math.floor(Math.random() * data.length);

        // Check if two trends have the same volume
        if (this.checkEqualness(numeral(pre_searches)._value, data[i].searchVolume)) {
            return this.vanillaCollectData(pre_title, pre_searches);
        };

        // Collect all data into one object
        let result = {
            first_title: pre_title,
            first_searches: pre_searches,
            second_title: removeBugSymbols(data[i].keyword),
            second_searches: numeral(data[i].searchVolume).format('0.0a'),
            correct: (numeral(pre_searches)._value > data[i].searchVolume) ? 1 : 0
        };

        // Return data
        return result;

    }
    
}

module.exports = TheHigherLowerGame;