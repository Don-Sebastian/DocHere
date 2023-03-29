// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const router = express.Router();
const DoctorController = require('../controller/doctorController');
const Auth = require('../middleware/auth');
// const upload = require('../middleware/multer');
const parser = require('../middleware/cloudinary.config');

router.post('/doctor-register', DoctorController.postDocRegister);
router.post('/doctor-login', DoctorController.postDocLogin);
router.post('/google/auth', DoctorController.postGoogleSignIn);

router.post('/post-doc-by-id', Auth.verifyAuthDoctor, DoctorController.postHomePage);

router.post('/update-doctor-profile', parser.single('profileImageDoctor'), Auth.verifyAuthDoctor, DoctorController.postUpdateDoctorProfile);

module.exports = router;
