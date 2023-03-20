/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    })
      .then(() => console.log('MongoDB connected successfully'))
      .catch((error) => {
        console.log('Database Connection Failed. Exiting now...');
        console.error(error);
        process.exit(1);
      });
  } catch (error) {
    console.log('MongoDB failed to connect', error);
    process.exit(1);
  }
};

module.exports = connectDB;
