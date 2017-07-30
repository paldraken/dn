const should = require('chai').should();
const assert = require('chai').assert;

// before test
const utils = require('../utils');


const User = require('../../models/user');
let tokenAuth = require('../../services/token.auth');


describe('tokenAuth', function () {

    it('should be auth user by token', async function () {
        try  {
            let userModel = await User.create({username: 'test1', password: 'qwerty123', lastname: 'xxx', firstname: 'xxx'});
            let userModel2 = await tokenAuth(userModel.api_token);
            return assert.equal(userModel.username, userModel2.username);
        } catch (err) {
            return assert.ok(false);
        }
    });

    it('should be auth user by token failed', async function () {

        tokenAuth('fake_user_token')
            .then(() => {
                assert.ok(false, 'tokenAuth must throw Access denied Exception');
            })
            .catch((err) => {
                assert.equal(err, 'Access denied.', 'err equal `Access denied.`');
            });
    });

});