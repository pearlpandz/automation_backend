const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    boxId: { type: String, required: true, unique: true },
    devices: {
        type: [
            {
                refId: { type: mongoose.Types.ObjectId },
                surName: { type: String }, 
                speed: { type: Number, default: 0 },
                status: { type: Boolean, default: false },
            }
        ], default: [], required: true
    },
    userId: { type: mongoose.Types.ObjectId, required: true },
    createdAt: { type: Date },
});

// schema.plugin(beautifyUnique);

var RoomSchema = mongoose.model('rooms', schema);

module.exports = RoomSchema;