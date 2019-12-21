const express = require('express');
const routes = require('./routes');


let app = express();
let port = 3000;
let hostAddr = 'localhost'


app.use('/employees', routes.employees);


app.listen(port, hostAddr);
console.log('Express app listening on ' + hostAddr + ':' + port);