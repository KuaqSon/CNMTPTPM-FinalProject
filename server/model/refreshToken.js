

var mongoose = require('mongoose');

// User Schema
var rfTokenSchema = mongoose.Schema({
   userId: {
    type: String,
    required: true
   },
   rfToken: {
    type: String,
    required: true
   },
    create: {
        default: Date.now
   }

});

var rfToken = module.exports = mongoose.model('rfToken', rfTokenSchema);

