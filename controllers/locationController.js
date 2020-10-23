const Location = require('../models/Location');
const constants = require('../constants/appConstans');
const User = require('../models/User');
const { generateJWT } = require('../helpers/auth');

exports.addLocation = (request, response, next) => {
    const locationData = request.body;

    Location.create(locationData, (err, success) => {
        if (err) {
            next({ 'msg': constants.COMMON_ERROR });
        } else {
            return response.send({ 'status': 200, 'msg': constants.LOCATION_ADDED });
        }
    });
}

exports.updateLocation = (document, response) => {
    Location.findOne({ '_id': document.location }, (err, locationDoc) => {
        if (err) {
            next({ 'msg': constants.COMMON_ERROR });
        } else {
            if (document.userType == 'C') {
                locationDoc.candidates.push(document._id);
            } else {
                locationDoc.voters.push(document._id);
            }
            Location.update({ "_id": locationDoc._id }, locationDoc, (err, success) => {
                if (err) {
                    next({ 'msg': constants.COMMON_ERROR });
                } else {
                    if (document.userType == 'C') {
                        return response.send({ 'status': 200, 'msg': constants.CANDIDATE_ADDED });
                    } else {
                        return response.send({ 'status': 200, 'msg': constants.USER_REGISTERED });
                    }
                }
            });
        }
    });
}

exports.populateCandidates = (user, response, next) => {
    if(!user._id){
        next({ "msg": constants.COMMON_ERROR });
    }
    User.findOne({ '_id': user._id })
        .populate('location')
        .exec((err, user) => {
            if (err) {
                next({ "msg": constants.COMMON_ERROR });
            } else {
                user.populate('location.candidates')
                    .execPopulate()
                    .then((doc) => {
                        const userObj = user.toObject();
                        generateJWT(userObj, next)
                            .then((token) => {
                                response.setHeader('X-Access-Token', token);
                                return response.send({ 'status': 200, 'user': doc });
                            })
                            .catch((err) => next({ 'status': 401, 'msg': constants.UNAUTHORIZED }));
                    })
                    .catch(err => next({ 'msg': constants.COMMON_ERROR }));
            }
        });
}

exports.getLocations = (request, response, next) => {
    Location.find({})
        .then((locations) => {
            return response.send({ 'locations': locations })
        })
        .catch((err) => next({ 'msg': constants.COMMON_ERROR }));
}