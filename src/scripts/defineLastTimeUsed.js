const moment = require('moment');

module.exports = (lastTimeUsed) => {

    return moment(lastTimeUsed).fromNow();
        
}