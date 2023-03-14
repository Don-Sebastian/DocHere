require('dotenv').config();
const http = require('http');
const app = require('./app')
const server = http.createServer(app);

const { API_PORT } = process.env;
const PORT = process.env.BACKEND_PORT || API_PORT;

server.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});