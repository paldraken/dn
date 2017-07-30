process.env.NODE_ENV = 'test';

let config = require('../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

beforeEach(function (done) {


    function clearDB() {
        for (let i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function() {});
        }
        return done();
    }


    if (mongoose.connection.readyState === 0) {
        mongoose.connect(config.db, {useMongoClient: true}, function (err) {
            if (err) {
                throw err;
            }
            return clearDB();
        });
    } else {
        return clearDB();
    }
});

afterEach(function (done) {
    mongoose.disconnect();
    return done();
});