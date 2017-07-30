
const mongoose = require('mongoose');
const crypto = require('crypto');
const randomString = require('../util/utils').randomString;
const sha512 = require('../util/utils').sha512;


const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password_hash: {type: String, required: true},
    api_token: {type: String, default: randomString(128)},
    salt: String,
    role: String,
    enabled: {type: Boolean, default: true},
    created_at: {type: Date, default: new Date()}
});

userSchema.virtual('password')
    .get(function () {
        return this.password_hash;
    })
    .set(function (password) {
        let salt = randomString(32);
        this.password_hash = sha512(password, salt);
        this.salt = salt;
    });

userSchema.methods.validatePassword = function (password) {
    return sha512(password, this.salt) === this.password_hash;
};

userSchema.methods.createToken = function () {
    this.api_token = randomString(128);
};


let User = mongoose.model('User', userSchema);

module.exports = User;