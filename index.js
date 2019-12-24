const express = require('express');
const routes = require('./routes');


let app = express();
let port = 3000;
let hostAddr = 'localhost'


app.use('/employee', routes.employees);
//app.use('/product', routes.product);
app.use('/',routes.docs);


app.listen(port, hostAddr);
console.log('Express app listening on ' + hostAddr + ':' + port);