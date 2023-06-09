// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Incorrect Name'],
    min: 2,
    max: 20,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    min: 3,
  },
  verified_by_admin: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
  },
  avatar: {
    type: String,
  },
  provider: {
    type: String,
  },
  google_verified: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profile: [{
    speciality: {
      type: String,
      required: true,
    },
    educationQuality: {
      type: String,
      required: true,
    },
    medicalRegNumber: {
      type: Number,
      required: true,
    },
    medRegCouncil: {
      type: String,
      required: true,
    },
    medRegYear: {
      type: String,
      required: true,
    },
    profileImageDoctor: {
      type: String,
    },
  }],
});

// eslint-disable-next-line func-names
DoctorSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// eslint-disable-next-line func-names
DoctorSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw Error('Incorrect Password');
  } else throw Error('Incorrect Email');
};

module.exports = mongoose.model('doctors', DoctorSchema);
