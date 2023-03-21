/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (userId) => jwt.sign({ userId }, process.env.SECRET_KEY, {
  expiresIn: maxAge,
});

const handleError = (err) => {
  const errors = { name: '', email: '', password: '' };

  if (err === 'Incorrect Name') errors.message = 'Name should be valid';

  if (err.message === 'Incorrect Email') errors.message = 'This email is not registered';

  if (err.message === 'Incorrect Password') errors.message = 'This password is incorrect';

  if (err.code === 11000) errors.message = 'Email already registered';

  return errors;
};

class UserController {
  async postRegister(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await userModel.create({ name, email, password });
      // eslint-disable-next-line no-underscore-dangle
      const token = createToken(user._id);

      res.cookie('jwtUser', token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      delete user?.password;
      res
        .status(201)
        .send({
          token,
          created: true,
          message: 'Account created Successfully',
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      const errors = handleError(error);
      res.status(401).send({ errors, created: false });
    }
  }

  async postLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.login(email, password);

      // eslint-disable-next-line no-underscore-dangle
      const token = createToken(user._id);

      res.cookie('jwtUser', token, {
        withCredentials: true,
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: maxAge * 1000,
      });

      res
        .status(202)
        .json({ token, loginStatus: true, message: 'Logged in Successfully' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      const errors = handleError(error);
      res.json({ errors, loginStatus: false });
    }
  }

  async postGoogleSignIn(req) {
    try {
      console.log(req.body);
      // const { email, email_verified, name } = req.body;
      // if (email_verified) {
      //   const user = await userModel.findOne({ email });
      //   if (!user) await userModel.create({ name, email });
      // }
    } catch (error) {
      console.error(error);
    }
  }

  async postHomePage(req, res) {
    const { name, email } = req.body.user;
    res.status(200).send({ name, email, success: true });
  }
}

module.exports = new UserController();
