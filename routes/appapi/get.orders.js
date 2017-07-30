let Order = require('../../models/order');

// GET /orders
module.exports = async function (req, res, next) {

    let orders = await Order.find({});
    res.send(orders);
};