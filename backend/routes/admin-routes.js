/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();
const Auth = require('../middleware/auth');
const AdminController = require('../controller/adminController');

router.post('/admin-register', AdminController.postAdminRegister);
router.post('/admin-login', AdminController.postAdminLogin);

router.post('/admin-home', Auth.verifyAuthAdmin, AdminController.postAdminHomePage);

module.exports = router;
