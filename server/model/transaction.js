var mongoose = require('mongoose');

// User Schema
var TransactionSchema = mongoose.Schema({

    accountNumber: {
        type: String,
        required: true
    },
    // transfer money to who?
    // transferTo: {
    //     type: String,
    //     // required: true
    // },
    idUserSend: {
        type: String,
        required: true

    },
    idPaymentSend: {
        type: String,
        required: true
    },
    nameUserSend: {
        type: String,
        required: false
    },
    idUserReceive: {
        type: String,
        required: true

    },
    idPaymentReceive: {
        type: String,
        required: true
    },
    nameUserReceive: {
        type: String,
        required: false
    },
    transferMoney: {
        type: Number,
        required: true
    },
    infor: {
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

var Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);

