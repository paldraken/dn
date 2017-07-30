
let validator = require('validator');

module.exports.clientFormValidator = function (data, files) {

    let errors = [];

    if(!data.fio || !validator.isLength(data.fio + '', {min: 3, max: 300})) {
        errors.push({field: 'fio', message: 'Заполните ФИО'});
    }

    if(!data.phone || !validator.isLength(data.phone + '', {min: 5, max: 20})) {
        errors.push({field: 'phone', message: 'Заполните Телфеон'});
    }

    if(!data.email || !validator.isEmail(data.email + '')) {
        errors.push({field: 'email', message: 'Заполните e-mail'});
    }

    if(!files || files.length < 1) {
        errors.push({field: 'email', message: 'Прикрепите хотя бы одну фотограцию'});
    }

    return errors;
};