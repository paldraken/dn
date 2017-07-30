process.stdin.resume();
process.stdin.setEncoding('utf8');
let util = require('util');

let config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = require('./models/user');

console.log('All data should be removed. Continue `y`. Cancel `n`');
process.stdin.on('data', function (text) {
    text = text.toString().trim();
    console.log(util.inspect(text));
    if (text === 'y' || text === 'Y') {
        start();
    } else  {
        process.exit();
    }
});


async function fixtures() {
    console.log('fixtures');
    await User.create({
        lastname: 'Admin',
        firstname: 'Admin',
        username:  process.env.DEFAULT_ADMIN_USERNAME || 'admin',
        password: process.env.DEFAULT_ADMIN_PASSWORD || 'MCfQoa$CkG71'
    })
}

async function clearDB() {
    console.log('clear all db data');
    for (let i in mongoose.connection.collections) {
        await mongoose.connection.collections[i].remove();
    }
}

function start() {
    mongoose.connect(config.db, {useMongoClient: true}, async function (err) {
        if (err) throw err;

        await clearDB();
        await fixtures();

        await mongoose.disconnect();
        process.exit();
    });
}