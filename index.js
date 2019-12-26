const express = require('express');

import { Routes } from "./routes.js";


let app = express();
let port = 3000;
let hostAddr = 'localhost'


app.use('/employee', Routes.employees);
//app.use('/product', routes.product);
app.use('/', Routes.docs);


app.listen(port, hostAddr);
console.log('Express app listening on ' + hostAddr + ':' + port);