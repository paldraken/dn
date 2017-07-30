const User = require('../models/user');

module.exports = async function (username, password) {

    let userModel = await User.findOne({username: username});
    if(!userModel) throw new Error('Invalid username or password');

    if(userModel.validatePassword(password)) {
        return userModel.api_token;
    }
    throw new Error('Invalid username or password');
};