/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const DoctorModel = require('../models/DoctorModel');
const AdminModel = require('../models/AdminModel');

class Auth {
  async verifyAuth(req, res, next) {
    try {
      // let token = req.cookies["jwtUser"];
      const token = req.headers.authorization.split(' ')[1];
      if (!token) return res.status(403).send({ message: 'Access Denied. Please Login!' });
      jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          return res.status(401).send({
            message: 'Auth failed. Please Login again!',
            success: false,
          });
        }
        const user = await userModel.findById(decoded.userId);
        if (user) {
          req.body.user = user;
          next();
        } else return res.status(403).send({ message: 'Access Denied. User not found!' });
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send({ error: err.message });
    }
  }

  async verifyAuthDoctor(req, res, next) {
    try {
      // let token = req.cookies["jwtUser"];
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res
          .status(403)
          .send({ message: 'Access Denied. Please Login!' });
      }
      jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          return res.status(401).send({
            message: 'Auth failed. Please Login again!',
            success: false,
          });
        }
        const doctor = await DoctorModel.findById(decoded.doctorId);
        if (doctor) {
          req.body.doctor = doctor;
          next();
        } else {
          return res
            .status(403)
            .send({ message: 'Access Denied. User not found!' });
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send({ error: err.message });
    }
  }

  async verifyAuthAdmin(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res
          .status(403)
          .send({ message: 'Access Denied. Please Login!' });
      }
      jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          return res.status(401).send({
            message: 'Auth failed. Please Login again!',
            success: false,
          });
        }
        const admin = await AdminModel.findById(decoded.adminId);
        if (admin) {
          req.body.admin = admin;
          next();
        } else {
          return res
            .status(403)
            .send({ message: 'Access Denied. User not found!' });
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send({ error: err.message });
    }
  }
}

module.exports = new Auth();
