const bcrypt = require('bcrypt');
const constants = require('../constants/appConstans');

exports.encryptPassword = (password, next) => {
   return new Promise((resolve,reject)=>{
    bcrypt.genSalt(15)
    .then((salt)=>{
     bcrypt.hash(password,salt)
         .then((hashedPassword)=>{
             resolve(hashedPassword);
         })
         .catch((err) =>reject(next({'msg':constants.COMMON_ERROR})));
    })
    .catch((err)=>reject(next({'msg':constants.COMMON_ERROR})));
   })
}

exports.verifyPassword = (password,hashedPassword)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,hashedPassword)
            .then(()=> resolve(true))
            .catch((err) => reject(false));
    })
}