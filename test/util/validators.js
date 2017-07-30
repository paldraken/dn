const assert = require('chai').assert;

let clientFromValidator = require('../../util/validators').clientFormValidator;

describe('validators', function () {

    it('should client form have errors', function () {

        let data = {};
        let result = clientFromValidator(data, []);
        assert.lengthOf(result, 4, 'Validation result must have 4 error');

        data = { fio: 'qwerty'};
        result = clientFromValidator(data, []);
        assert.lengthOf(result, 3, 'Validation result must have 3 error');


        data = { email: 'invalid_email'};
        result = clientFromValidator(data, []);
        assert.lengthOf(result, 4, 'Validation result must have 4 error');
    });

    it('should client form don\'t have errors', function () {

        let data = {
            fio: 'qwerty',
            phone: '123456',
            email: 'aaaa@aaaa.ru'
        };
        let result = clientFromValidator(data, [{file: 'mockFile'}]);
        assert.lengthOf(result, 0, 'Validation result must have 0 error');
    })

});