let expect = require('chai').expect;
const assert = require('assert');

const User = require('../../models/user');

describe('user', function () {
    it('should be password validation must be valid', function (done) {
        let u = new User();
        let password = 'qwerty123';
        u.password = password;

        assert.ok(u.validatePassword(password));
        done();
    });


    it('should have validation error if username, password_hash, lastname and firstname is empty', function (done) {
        let u = new User();
        u.validate(function(err) {
            expect(err.errors.username).to.exist;
            expect(err.errors.password_hash).to.exist;
            expect(err.errors.lastname).to.exist;
            expect(err.errors.firstname).to.exist;
            done();
        });
    });

});