const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const schema = new Schema({
    name: { type: String, required: true },
    mobile: {
        type: Number,
        trim: true,
        lowercase: true,
        unique: 'This Mobile Number already present',
        required: 'Mobile Number is required'
    },
    password: { type: String },
    role: { type: String, required: 'Role is required' },
    email: { type: String, unique: 'This Email already present', },
    lastLogin: { type: Date, default: null },
    createdAt: { type: Date },
});

// schema.plugin(beautifyUnique);

schema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

var UserSchema = mongoose.model('users', schema);

module.exports = UserSchema;