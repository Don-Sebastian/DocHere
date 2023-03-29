/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const AdminModel = require('../models/AdminModel');

const maxAge = 3 * 24 * 60 * 60;

// eslint-disable-next-line max-len
const createToken = (adminId) => jwt.sign({ adminId }, process.env.SECRET_KEY, { expiresIn: maxAge });

const handleError = (err) => {
  const errors = { email: '', password: '' };

  //   if (err === 'Incorrect Name') errors.message = 'Name should be valid';

  if (err.message === 'Incorrect Email') { errors.message = 'This email is not registered'; }

  if (err.message === 'Incorrect Password') { errors.message = 'This password is incorrect'; }

  if (err.code === 11000) errors.message = 'Email already registered';

  return errors;
};

class AdminController {
  async postAdminLogin(req, res) {
    try {
      const { email, password } = req.body;
      const admin = await AdminModel.login(email, password);
      const token = createToken(admin._id);
      res.status(202).json({ token, loginStatus: true, message: 'Admin Logged in Successfully!' });
    } catch (err) {
      const errors = handleError(err);
      res.json({ errors, loginStatus: false });
    }
  }

  async postAdminRegister(req, res) {
    try {
      const { email, password } = req.body;
      const Admin = await AdminModel.create({ email, password });
      // eslint-disable-next-line no-underscore-dangle
      const token = createToken(Admin._id);

      // res.cookie('jwtUser', token, {
      //   withCredentials: true,
      //   httpOnly: true,
      //   maxAge: maxAge * 1000,
      // });
      //   delete user?.password;
      res.status(201).send({
        token,
        created: true,
        message: 'Account created Successfully... Please ',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      const errors = handleError(error);
      res.status(401).send({ errors, created: false });
    }
  }

  async postAdminHomePage(req, res) {
    const { email } = req.body.admin;
    res.status(200).send({ email, success: true });
  }
}

module.exports = new AdminController();
