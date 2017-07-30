let express = require('express');
let router = express.Router();
let clientFromValidator = require('../util/validators').clientFormValidator;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/list', function (req, res, next) {
    res.send({foo: 'bar'});
});

let multer = require('multer');
let upload = multer({
    storage: require('../services/file.storage.local').storage,
    fileFilter: fileFilter
});

function fileFilter (req, file, cb) {

    let errors = clientFromValidator(req.body, req.files);

    if(errors.length === 0) {
        // @toDo remove it. clear files after test end
        if(process.env.NODE_ENV === 'test') {
            cb(null, false);
        } else {
            cb(null, true);
        }
    } else  {
        cb({status: 400, message: errors});
    }
}

//
router.post('/order', upload.array('photos', 6), async function (req, res, next) {

    try {
        let Order = require('../models/order');

        let files = [];
        for (let i = 0; i < req.files.length; i++) {
            let file = req.files[i];
            let fileModel = {
                filename: file.originalname,
                hash: file.filename,
                upload_by: 'client'
            };
            files.push(fileModel);
        }

        let order = Order.create({
            fio: req.body.fio,
            phone: req.body.phone,
            email: req.body.email,
            blood_type: req.body.blood_type,
            files: files
        });

        res.send({ok: true});

    } catch (err) {
        res.sendStatus(400);
    }

});

module.exports = router;
