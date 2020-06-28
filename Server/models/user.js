const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    googleId: {type: String, required : true},
    displayName: {type: String, required : true},
    firstName: {type: String, required : true},
    lastName: {type: String, required : true},
    picture: {type: String, required : false},
    email: {type: String, required : true},
});

module.exports = mongoose.model('User', userSchema);