let Order = require('../../models/order');

// DELETE /order/:id
module.exports = async function (req, res, next) {

    let order = await Order.findOne({_id: req.params.id});
    if(!order) {
        res.sendStatus(404);
    } else {
        order.deleted = true;
        await order.save();
        res.send(order);
    }
};