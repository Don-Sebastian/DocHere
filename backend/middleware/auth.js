/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

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
}

module.exports = new Auth();
