const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let fileSchema = new Schema({
    filename: { type: String },
    hash: { type: String },

    upload_by: { type: String },
    deleted: { type: Boolean, default: false },
    created_at: { type: Date, default: new Date() }
});

module.exports.schema = fileSchema;

let File = mongoose.model('File', fileSchema);
module.exports = File;