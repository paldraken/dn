const crypto = require('crypto');

module.exports.randomString = function (length = 32) {
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};


module.exports.sha512  = function (password, salt) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
};