const constants = require('../constants/appConstans');
const Admin = require('../models/Admin');
const { encryptPassword, verifyPassword } = require('../helpers/encryption');
const { generateJWT } = require('../helpers/auth');

exports.loginAdmin = async (request, response, next) => {
    const { emailId, password } = request.body;

    Admin.findOne({ "emailId": emailId }, (err, admin) => {
        if (err) {
            next({ 'msg': constants.COMMON_ERROR });
        }

        if (!admin) {
            next({ 'status': 400, 'msg': constants.INVALID_USER });
        } else {
            verifyPassword(password, admin.password)
                .then((isValid) => {
                    const adminObj = admin.toObject();
                    Reflect.deleteProperty(adminObj,'password');
                    Reflect.deleteProperty(adminObj,'_id');
                    generateJWT(adminObj,next)
                        .then((token)=>{
                            response.setHeader('X-Access-Token',token);
                            return response.send({ 'status': 200,'admin':adminObj });
                        })
                        .catch((err) => next({ 'status': 401, 'msg': constants.UNAUTHORIZED }));        
                })
                .catch((err) => next({ 'status': 401, 'msg': constants.INVALID_PASSWORD }));
        }
    });
}

exports.signUpAdmin = (request, response, next) => {
    const { password } = request.body;

    encryptPassword(password, next)
        .then((hashedPassword) => {
            request.body.password = hashedPassword;
            Admin.create(request.body, (err, admin) => {
                if (err) {
                    next({ 'msg': constants.COMMON_ERROR })
                } else {
                    const adminObj = admin.toObject()
                    Reflect.deleteProperty(adminObj,'_id');
                    Reflect.deleteProperty(adminObj, 'password');
                    generateJWT(adminObj,next)
                        .then((token)=>{
                            response.setHeader('X-Access-Token',token);
                            return response.send({ 'status': 200, 'admin': adminObj });
                        })
                        .catch((err) => next({'status': 401,'msg':constants.UNAUTHORIZED}))
                }
            })

        })
        .catch((err) => next({ 'msg': constants.COMMON_ERROR }))

}