const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const constants = require('../constants/appConstans');

const secret = crypto.randomBytes(32).toString('hex');
process.env.ACCESS_TOKEN_KEY = secret;

exports.generateJWT = (user,next) =>{
    return new Promise((resolve,reject)=>{
    jwt.sign(user,process.env.ACCESS_TOKEN_KEY,{expiresIn:process.env.TOKEN_LIFE},(err,token)=>{
        if(err){
            return reject(next({'status':401,'msg':constants.UNAUTHORIZED}))
        }else{
            return resolve(token);
        }
    });
    });
}

exports.verifyJWT = (request,response,next) =>{
    var token = request.header('X-Access-Token');
    return new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.ACCESS_TOKEN_KEY,(err,success)=>{
            if(err){
                reject(next({'status':401,'msg':constants.UNAUTHORIZED}));
            }else{
                next();
            }
        })
    })
}