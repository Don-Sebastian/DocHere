const express = require("express");
const app = express();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require('./config/db')
const userRouter = require("./routes/user-router");

connectDB();

const corsConfig = {
  credentials: true,
  origin: [`${process.env.FRONTEND_PORT}`],
  method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
};
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRouter);


module.exports = app;
