'use-strict'

const debug = require ('debug')('API-Node:server');
const http = require ('http');
const express = require ('express');

const app = express();
const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

let route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "API NodeJs",
        version: "0.0.1"
    });
});
app.use('/', route);

server.listen(port);
server.on('error', onError)
console.log('API rodando na porta ' + port);

function normalizePort(val) {
    let port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }
}

function onError(error ) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE' :
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
