const router = require('express').Router();
const userController = require('../controllers/userController');
const userValidate = require('../middlewares/validator');
const locationController = require('../controllers/locationController');
const candidateController = require('../controllers/candidateController');
const upload = require('../middlewares/multer-config');
const adminController = require('../controllers/adminController');
const {verifyJWT} = require('../helpers/auth');

router.post('/addUser',userValidate.checkIfUserExists,verifyJWT,userController.addUser);

router.post("/addLocation",verifyJWT,userValidate.checkIfLocationExists,locationController.addLocation);

router.post("/addCandidate",userValidate.checkIfCandidateExists,verifyJWT,candidateController.addCandidate);

router.post('/getUser',userValidate.checkIfVoted,userController.getUser);

router.put('/addVote',verifyJWT,candidateController.addVote);

router.get('/result',candidateController.getResult);

router.post('/upload',verifyJWT,upload.single('image'),candidateController.uploadImage);

router.get('/getLocations',verifyJWT,locationController.getLocations);

router.post('/login',adminController.loginAdmin);

router.post('/signUp',userValidate.checkIfEmailExists,adminController.signUpAdmin);

module.exports=router;