const User = require('../models/User');

module.exports = async (id) => {
    // let result = await User.find({ id: id }).then(user => (user.length > 0) ? true : false).catch(e => console.error(e))
    let result = await User.find({ id: id }, (err, res) => {
        return res;
    });
    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
}