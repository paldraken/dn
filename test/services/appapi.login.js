let expect = require('chai').expect;
const should = require('chai').should();
const utils = require('../utils');
const assert = require('chai').assert;

const appapiLogin = require('../../services/appapi.login');
const User = require('../../models/user');

describe('appapiLogin', function () {

    it('should be auth user', async function () {
        try  {
            await User.create({username: 'test1', password: 'qwerty123', lastname: 'xxx', firstname: 'xxx'});
            let token = await appapiLogin('test1', 'qwerty123');
            return assert.ok(token);
        } catch (err) {
            return assert.ok(false);
        }
    });

    it('should be error auth user', async function () {
        try  {
            await appapiLogin('test_error', 'error');
            return assert.ok(false);
        } catch (err) {
            assert.equal(err, 'Error: Invalid username or password', 'err equal `Error: Invalid username or password`');
        }
    });

});