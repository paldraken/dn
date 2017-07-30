
let multer = require('multer');
let config = require('../config');
let randomString = require('../util/utils').randomString;

module.exports.storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, config.root + '/public/storage')
    },
    filename: function (req, file, cb) {
        cb(null, randomString())
    }
});

module.exports.filter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};