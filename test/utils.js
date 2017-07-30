process.env.NODE_ENV = 'test';

let config = require('../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

beforeEach(function (done) {


    function clearDB() {
        let promises = [];
        for (let i in mongoose.connection.collections) {

            +function (index) {
                promises.push(
                    new Promise((resolve, reject) => {
                        mongoose.connection.collections[index].remove(function() { resolve(); });
                    })
                );
            }(i);

        }
        Promise.all(promises)
            .then(values => {console.log('DONE'); done() })
            .catch(err => {done()})
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
    mongoose.disconnect(() => {
        return done();
    });
});


module.exports.createOrder = async function (params = {}) {
    let Order = require('../models/order');
    let def = {
        fio: 'Test1',
        phone: '1234567890',
        email: 'aaaa@aaaa.ru',
    };
    let data = Object.assign({}, def, params);
    return await Order.create(data);
};

module.exports.createUser = async function (params = {}) {
    let User = require('../models/user');
    let def = {
        username: 'TestAdmin',
        password: 'test_password',
        lastname: 'Admin',
        firstname: 'Test',
        api_token: 'test_token',
    };
    let data = Object.assign({}, def, params);
    return await User.create(data);
};