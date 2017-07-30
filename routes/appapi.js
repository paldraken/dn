const express = require('express');
const router = express.Router();


router.use(require('./appapi/check.auth.middleware'));


router.post('/login', require('./appapi/post.login'));

router.post('/test', function (req, res, next) {
    res.send({ok: true});
});


module.exports = router;