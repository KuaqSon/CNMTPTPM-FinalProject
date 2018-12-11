

var mongoose = require('mongoose');

// User Schema
var EmployeeSchema = mongoose.Schema({
username: {
    type: String,
    required: false
},
password: {
    type: String,
    required: false
},
created: {
    type: Date,
},
});

var Employee = module.exports = mongoose.model('Employee', EmployeeSchema);

