const express = require("express");
const app = express();
const connectDB = require('./config/db')
const userRouter = require("./routes/user-router");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', userRouter);


module.exports = app;
