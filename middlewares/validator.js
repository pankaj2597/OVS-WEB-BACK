const User = require('../models/User');
const constants = require('../constants/appConstans');
const Location = require('../models/Location');
const Candidate = require('../models/Candidate');
const Admin = require('../models/Admin');

exports.checkIfUserExists = (request,response,next)=>{
    const {aadharId} = request.body;

    User.findOne({'aadharId':aadharId},(err,user)=>{
        if(err){
            next({'msg':constants.COMMON_ERROR});
        }
        if(user){
            next({'status':400,'msg':constants.AADHAR_EXISTS});
        }else{
            next();
        }
    });
}

exports.checkIfLocationExists = (request,response,next)=>{
    const {locationId} = request.body;

    Location.findOne({'locationId':locationId},(err,location)=>{
        if(err){
            next({'msg':constants.COMMON_ERROR});
        }
        if(location){
            next({'status':400,'msg':constants.LOCATION_ID_EXISTS});
        }else{
            next();
        }
    });
}

exports.checkIfCandidateExists = (request,response,next)=>{
    const {candidateId} = request.body;
    
    Candidate.findOne({'candidateId':candidateId},(err,candidate)=>{
        if(err){
            next({'msg':constants.COMMON_ERROR});
        }
        if(candidate){
            next({'status':400,'msg':constants.CANDIDATE_ID_EXISTS});
        }else{
            next();
        }
    });
}

exports.checkIfEmailExists = (request,response,next) =>{
    Admin.findOne({'emailId':request.emailId},(err,success)=>{
        if(err){
            next({'msg':constants.COMMON_ERROR});
        }
        if(success){
            next({'status':400,'msg':constants.EMAIL_EXISTS})
        }else{
            next();
        }

    });
}

exports.checkIfVoted = (request,response,next)=>{
    const {aadharId} = request.body;
    User.findOne({'aadharId':aadharId},(err,user)=>{
        if(err){
            next({'msg':constants.COMMON_ERROR});
        }
        if(user.hasVoted){
            next({'status':202,'msg':constants.CANNOT_VOTE_AGAIN});
        }else{
            next();
        }
    })
}
