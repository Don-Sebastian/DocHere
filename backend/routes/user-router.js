// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const router = express.Router();
const UserController = require('../controller/userController');
const Auth = require('../middleware/auth');

router.post('/register', UserController.postRegister);
router.post('/login', UserController.postLogin);
router.post('/google/auth', UserController.postGoogleSignIn);

router.post('/post-user-by-id', Auth.verifyAuth, UserController.postHomePage);

module.exports = router;
