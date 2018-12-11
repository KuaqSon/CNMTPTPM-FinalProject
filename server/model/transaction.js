var mongoose = require('mongoose');

// User Schema
var TransactionSchema = mongoose.Schema({
   idUser: {
    type: String,
    required: true
   },
   // transfer money to who?
   transferTo: {
    type: String,
    required: true
    },
    transferMoney: {
        type: Number,
        required: true
    },
    infor: {
        type: String,
        required: true
    },
    
    create: {
        default: Date.now
   },
    isDelete: {
        type: boolean,
        default: false
    }
    

});

var Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);

