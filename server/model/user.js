var mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    isAcive: {
        type: Boolean,
        default: true
    },
    numberOfAccount: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
   },
    isDelete: {
        type: Boolean,
        default: false
    }
    

});

var User = module.exports = mongoose.model('User', UserSchema);

