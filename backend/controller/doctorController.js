/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const DoctorModel = require('../models/DoctorModel');

const maxAge = 3 * 24 * 60 * 60;

// eslint-disable-next-line max-len
const createToken = (doctorId) => jwt.sign({ doctorId }, process.env.SECRET_KEY, { expiresIn: maxAge });

const handleError = (err) => {
  const errors = { name: '', email: '', password: '' };

  if (err === 'Incorrect Name') errors.message = 'Name should be valid';

  if (err.message === 'Incorrect Email') errors.message = 'This email is not registered';

  if (err.message === 'Incorrect Password') errors.message = 'This password is incorrect';

  if (err.code === 11000) errors.message = 'Email already registered';

  return errors;
};

class DoctorController {
  async postDocRegister(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await DoctorModel.create({ name, email, password });
      // eslint-disable-next-line no-underscore-dangle
      const token = createToken(user._id);

      // res.cookie('jwtUser', token, {
      //   withCredentials: true,
      //   httpOnly: true,
      //   maxAge: maxAge * 1000,
      // });
      delete user?.password;
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

  async postDocLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await DoctorModel.login(email, password);
      // eslint-disable-next-line no-underscore-dangle
      const token = createToken(user._id);

      //   res.cookie("jwtDoc", token, {
      //     withCredentials: true,
      //     secure: true,
      //     httpOnly: true,
      //     sameSite: "none",
      //     maxAge: maxAge * 1000,
      //   });

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

  async postGoogleSignIn(req, res) {
    try {
      // eslint-disable-next-line object-curly-spacing, object-curly-newline
      const { name, email, email_verified, picture } = req.body;
      if (email_verified) {
        const user = await DoctorModel.findOneAndUpdate(
          { email },
          {
            name,
            email,
            avatar: picture,
            provider: 'Google',
            google_verified: email_verified,
          },
          {
            upsert: true,
            runValidators: false,
            new: true,
            lean: true,
          },
        );
        if (user) {
          // eslint-disable-next-line no-underscore-dangle
          const token = createToken(user._id);
          res.status(202).json({
            token,
            loginStatus: true,
            message: 'Logged in Successfully',
          });
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      const errors = handleError(error);
      res.json({ errors, loginStatus: false });
    }
  }

  async postUpdateDoctorProfile(req, res) {
    // eslint-disable-next-line object-curly-newline
    const { speciality, educationQuality, medicalRegNumber, medRegCouncil, medRegYear } = req.body;
    const { _id } = req.body.doctor;
    const { path } = req.file;
    const profileDetails = {
      speciality,
      educationQuality,
      medicalRegNumber,
      medRegCouncil,
      medRegYear,
      profileImageDoctor: path,
    };
    await DoctorModel.findByIdAndUpdate(_id, {
      // eslint-disable-next-line max-len
      $set: { profile: profileDetails },
    }, {
      new: true,
    }).then((response) => {
      // if(!response.verified_by_admin)
      res.status(200).json({ response, success: true, message: 'Profile updated Successfully' });
    }).catch((err) => {
      res.status(400).json({ errors: err, success: false, message: 'Profile update failed!' });
    })
  }

  async postHomePage(req, res) {
    const {
      name, email, verified_by_admin,
    } = req.body.doctor;
    res.status(200).send({
      name, email, verified_by_admin, success: true,
    });
  }
}

module.exports = new DoctorController();
