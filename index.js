import { createRequire } from 'module';
const require = createRequire(import.meta.url)
const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');

InitializeLogging();

import { Routes } from './routes.js';

const RoutesInstance = new Routes();

let app = express();
let port = 3000;
let hostAddr = 'localhost'


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser());
/* app.use((req, res, next) => req.body.rows); // doesnt work*/
app.use('/rsc', RoutesInstance.rsc);
app.use('/product', RoutesInstance.product);
app.use('/lossreason', RoutesInstance.lossReason);
app.use('/employee', RoutesInstance.employee);
app.use('/trackedobject', RoutesInstance.trackedObject);
app.use('/txndata', RoutesInstance.txnData);
app.use('/', RoutesInstance.docs);


app.listen(port, hostAddr);
console.log('Express app listening on ' + hostAddr + ':' + port);

function InitializeLogging() {
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            // - Write to all logs with level `info` and below to `combined.log` 
            // - Write all logs error (and below) to `error.log`.
            new winston.transports.Console({ format: winston.format.simple() }),
            new winston.transports.File({ filename: './logs/exceptions.log', level: 'error' }),
            new winston.transports.File({ filename: './logs/stdout.log' })
        ]
    });
    logger.exceptions.handle( new winston.transports.File({ filename: './logs/exceptions.log' }));
    return logger;
}