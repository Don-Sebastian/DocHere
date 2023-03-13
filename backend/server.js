require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => {
  console.log("Connected to port wit", PORT);
});
