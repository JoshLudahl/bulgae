
//  User schema is designed as a module based program.

//  It allows you to only use this schema for authentication and allows you to use other databases to store user data.

//  You can assign an owner to the other parts of your details schema, fully separating your user details.

const mongoose = require('mongoose');

const userDetails = new mongoose.Schema({
    owner: String,
    first_name: String,
    last_name: String,
    address: String,
    state: String,
    city: String,

});

//  Allows updated timestamp to be updated aside from updating user details
userSchema.methods.setCurrentTime = function(cb) {
    this.updatedAt = Date.now;
    return cb;
};

module.exports = mongoose.model('UserDetails', userDetails);