// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const router = express.Router();
const DoctorController = require('../controller/doctorController');
const Auth = require('../middleware/auth');

router.post('/doctor-register', DoctorController.postDocRegister);
router.post('/doctor-login', DoctorController.postLogin);
router.post('/google/auth', DoctorController.postGoogleSignIn);

router.post('/post-doc-by-id', Auth.verifyAuth, DoctorController.postHomePage);

module.exports = router;
