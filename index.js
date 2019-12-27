import { createRequire } from "module";
const require = createRequire(import.meta.url)
const express = require('express');

import { Routes } from "./routes.js";

const RoutesInstance = new Routes();

let app = express();
let port = 3000;
let hostAddr = 'localhost'


app.use('/employee', RoutesInstance.employee);
app.use('/product', RoutesInstance.product);
app.use('/', RoutesInstance.docs);


app.listen(port, hostAddr);
console.log('Express app listening on ' + hostAddr + ':' + port);