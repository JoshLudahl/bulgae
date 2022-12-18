//
//  Server setup
//
const app = require('./app');
const http = require('http');

const port = 3000;
const hostname = '0.0.0.0'


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server is now running.`)
});