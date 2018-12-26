

var mongoose = require('mongoose');

// User Schema
var rfTokenSchema = mongoose.Schema({
   idUser: {
    type: String,
    required: true
   },
   rfToken: {
    type: String,
    required: true
   },
   created: {
      type: Date,
 },

});

var rfToken = module.exports = mongoose.model('rfToken', rfTokenSchema);

