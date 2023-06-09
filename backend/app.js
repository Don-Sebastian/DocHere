/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRouter = require('./routes/user-router');
const doctorRouter = require('./routes/doc-router');
const adminRouter = require('./routes/admin-routes');

const app = express();

connectDB();

const corsConfig = {
  credentials: true,
  origin: [`${process.env.FRONTEND_PORT}`],
  method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/admin', adminRouter);

module.exports = app;
