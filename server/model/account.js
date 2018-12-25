var mongoose = require('mongoose');

// User Schema
var AccountSchema = mongoose.Schema({
   
    idUser: {
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

var Account = module.exports = mongoose.model('Account', AccountSchema);

