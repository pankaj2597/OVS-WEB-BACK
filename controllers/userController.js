const User = require('../models/User');
const constants = require('../constants/appConstans');
const locationController = require('../controllers/locationController');

exports.addUser = (request,response,next)=>{
    const userData = request.body;

    User.create(userData,(err,user)=>{
        if(err){
            next({'msg':constants.COMMON_ERROR});
        }else{
            locationController.updateLocation(user,response);            
        }
    });
}

exports.getUser = (request,response,next)=>{
    const aadharId = request.body.aadharId;

    User.findOne({"aadharId":aadharId},(err,user)=>{
        if(err){
            next({'msg':constants.COMMON_ERROR});
        }else{
            locationController.populateCandidates(user,response,next);
        }
    });
}

exports.updateVoteFlag = (aadharId,response,next)=>{
    User.findOneAndUpdate({'aadharId':aadharId},{'hasVoted':true},(err,success)=>{
        if(err){
            next({'msg':constants.COMMON_ERROR});
        }else{
            return response.send({'status':200,'msg':constants.VOTE_CASTED});
        }
    });
}