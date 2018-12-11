var mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    asset:{
        type: Number,
        default: 0
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
    created: {
        type: Date,
   },
    isDelete: {
        type: Boolean,
        default: false
    }
    

});

var User = module.exports = mongoose.model('User', UserSchema);

