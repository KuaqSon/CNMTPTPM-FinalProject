var mongoose = require('mongoose');

// Receiver Schema
var ReceiverSchema = mongoose.Schema({
    idUser: {
        type: String,
        required: true
    },
    idUserReceiver: {
        type: String,
        required: false
    },
    accountNumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: false
    },

});

var Receiver = module.exports = mongoose.model('Receiver', ReceiverSchema);

