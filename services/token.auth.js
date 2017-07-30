const User = require('../models/user');


module.exports = async function (token) {

    let userModel = await User.findOne({api_token: token, enabled: true});

    if(!userModel) throw 'Access denied.';

    return userModel;
};