const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    aadharId:{
        type:Number
    },
    age:{
        type:Number,
        min:18
    },
    location:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Locations'
    },
    hasVoted:{
        type:Boolean,
        default:false
    },
    userType:{
        type:String,
        default:'U'
    }
});

module.exports = mongoose.model('User',schema);