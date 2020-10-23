const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    }
});

module.exports = mongoose.model('Admin',adminSchema);