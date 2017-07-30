let Order = require('../../models/order');
const mongoose = require('mongoose');
// POST /order/:id
module.exports = async function (req, res, next) {

    try  {
        await Order.update({ _id: mongoose.Types.ObjectId(req.params.id) }, req.body);
        let order = await Order.findOne({_id: req.params.id});
        res.send(order);
    } catch (err) {
        res.sendStatus(404);
    }

};