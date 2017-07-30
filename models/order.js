

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let fileSchema = require('./file').schema;

let orderSchema = new Schema({
    fio: { type: String, require: true },
    birthday: { type: String },
    address: { type: String },
    phone: { type: String, require: true },
    email: { type: String, require: true },
    blood_type: { type: String },

    files: [fileSchema],

    status: { type: String, default: 'new' },
    deleted: { type: Boolean, default: false },
    created_at: { type: Date, default: new Date() }
});


let Order = mongoose.model('Order', orderSchema);
module.exports = Order;