/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();
const Auth = require('../middleware/auth');
const AdminController = require('../controller/adminController');

router.post('/admin-register', AdminController.postAdminRegister);
router.post('/admin-login', AdminController.postAdminLogin);

router.post('/admin-home', Auth.verifyAuthAdmin, AdminController.postAdminHomePage);
router.delete('/delete-seenNotification/:notificationId', Auth.verifyAuthAdmin, AdminController.deleteSeenNotification);
router.get('/all-doctor-list', Auth.verifyAuthAdmin, AdminController.getAllDoctorDetailsAdmin);
router.get('/get-doctor-details/:doctorId', Auth.verifyAuthAdmin, AdminController.getDoctorDetailsById);
router.put('/verify-Doctor/:doctorId', Auth.verifyAuthAdmin, AdminController.putVerifyDoctorAdminbyId);

module.exports = router;
