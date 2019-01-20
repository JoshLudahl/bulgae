

const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Uncategorized'
    },
    owner: {
        type: String,
        required: true
    },
    expense: {
        type: Boolean,
        default: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: String,
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//  Allows updated timestamp to be updated aside from updating user details
budgetSchema.methods.setCurrentTime = function(cb) {
    this.updatedAt = Date.now;
    return cb;
};

module.exports = mongoose.model('Budget', userSchema);