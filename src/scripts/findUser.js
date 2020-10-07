const User = require('../models/User');

module.exports = async (id) => {
    let result = await User.find({ id: id }).then(user => (user.length > 0) ? true : false).catch(e => console.error(e))
    return result;
}