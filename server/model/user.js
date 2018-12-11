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
    admin: {
        type: Number
    },
    
    gmail:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    isAcive: {
        type: boolean,
        default: true
    },
    create: {
        default: Date.now
   },
    isDelete: {
        type: boolean,
        default: false
    }
    

});

var User = module.exports = mongoose.model('User', UserSchema);

