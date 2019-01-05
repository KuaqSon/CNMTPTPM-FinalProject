
var mongoose = require('mongoose');

// authOTP Schema
var OTPSchema = mongoose.Schema({

    idUser: {
        type: String,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    OTP: {
        type: String,
        required: true
    },
    created: {
        type: Date,
    },
    isDelete: {
        type: Boolean,
        default: false
    }


});

var authOTP = module.exports = mongoose.model('authOTP', OTPSchema);

