const express = require('express');
const router = express.Router();


router.use(require('./appapi/check.auth.middleware'));


router.post('/login', require('./appapi/post.login'));


router.get('/orders', require('./appapi/get.orders'));
router.delete('/order/:id', require('./appapi/delete.order.id'));
router.post('/order/:id', require('./appapi/post.order.id'));
//
// router.post('/order/:id/photo', '');
// router.delete('/order/:id/photo', '');
//
// router.post('/order/:id/donor/find', '');
// router.delete('/order/:id/donor', '');
// router.post('/order/:id/donor/:donorId/note');


router.post('/test', function (req, res, next) {
    res.send({ok: true});
});


module.exports = router;