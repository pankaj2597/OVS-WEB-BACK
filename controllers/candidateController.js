const Candidate = require('../models/Candidate');
const constants = require('../constants/appConstans');
const locationController = require('../controllers/locationController');
const userController = require('../controllers/userController');
const User = require('../models/User');

exports.addCandidate = (request, response, next) => {
    const candidateData = request.body;

    Candidate.create(candidateData, (err, candidate) => {
        if (err) {
            next({ 'msg': constants.COMMON_ERROR });
        } else{
             locationController.updateLocation(candidate,response);
        }
    });
}

exports.addVote = (request,response,next)=>{
    const {id,aadharId} = request.body;

    User.findOne({'aadharId':aadharId})
        .then((user)=>{
            if(user.hasVoted){
                next({'status':200,'msg':constants.CANNOT_VOTE_AGAIN});    
            }else{
                Candidate.findOne({'_id':id},(err,candidate)=>{
                    if(err){
                        next({'msg':constants.COMMON_ERROR});
                    }else{
                        candidate.voteCount++;
                        candidate.save((err,success)=>{
                            if(err){
                                next({'msg':constants.COMMON_ERROR});
                            }else{
                                userController.updateVoteFlag(aadharId,response,next);
                            }
                        })
                    }
                })
            }
        })
        .catch((err) => {
            next({'status':500,'msg':constants.COMMON_ERROR})
        });

   
}

exports.getResult = (request,response,next)=>{
    Candidate.find({})
             .populate('location')
             .sort({'voteCount':-1})
             .lean()
             .exec((err,success)=>{
                 if(err){
                     next({'msg':constants.COMMON_ERROR});
                 }else{
                     var results = success.map((obj)=>{
                        if(obj){
                            delete obj.location.candidates;
                            delete obj.location.voters;
                        }
                        return obj;
                     });
                     return response.send({'status':200,"results":results})
                 }
             })
}

exports.uploadImage = (request,response,next)=>{
    if(!request.file){
        next({'msg':constants.COMMON_ERROR});
    }else{
        var filePath = "http://localhost:7781/" + request.file.destination + request.file.filename;
        return response.send({'status':200,'file':filePath});
    }
}