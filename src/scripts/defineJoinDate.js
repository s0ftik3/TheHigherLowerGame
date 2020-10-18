const moment = require('moment');

module.exports = (joinedAt) => {

    return moment(joinedAt).format('LL');
        
}