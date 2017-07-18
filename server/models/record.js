// server/models/record.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RecordSchema   = new Schema({
    name: String,
    address: String,
    ssot_name: String,
    exception_type: String,
    load_date: String
});

module.exports = mongoose.model('Record', RecordSchema);    