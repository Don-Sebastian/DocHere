/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'This field is required'],
  },
  password: {
    type: String,
    required: [true, 'This field is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

AdminSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

AdminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email });
  if (admin) {
    const auth = await bcrypt.compare(password, admin.password);
    if (auth) return admin;
    throw Error('Incorrect Password');
  } else throw Error('Incorrect Email');
}

module.exports = mongoose.model('admin', AdminSchema);
