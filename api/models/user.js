const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'USER'
    },
    verified: {
        type: Boolean,
        default: false
    }
});

//  Allows updated timestamp to be updated aside from updating user details
userSchema.methods.setCurrentTime = function(cb) {
    this.updatedAt = Date.now;
    return cb;
};

userSchema.methods.comparePasswords = function(cb) {
    return this.password === cb;
}

module.exports = mongoose.model('User', userSchema);