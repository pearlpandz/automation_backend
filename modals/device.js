const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true },
    createdAt: { type: Date },
});

// schema.plugin(beautifyUnique);

var DeviceSchema = mongoose.model('devices', schema);

module.exports = DeviceSchema;