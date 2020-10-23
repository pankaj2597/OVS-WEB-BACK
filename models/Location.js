const mongoose = require('mongoose');

const schema = mongoose.Schema({
    locationName: {
        type: String
    },
    locationId:{
        type:String,
        unique:true
    },
    candidates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Candidates'
        }
    ],
    voters:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
});

module.exports = mongoose.model('Locations', schema);