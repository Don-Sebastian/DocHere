const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');

router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);

module.exports = router;