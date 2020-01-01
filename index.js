import { createRequire } from "module";
const require = createRequire(import.meta.url)
const express = require('express');

import { Routes } from "./routes.js";

const RoutesInstance = new Routes();

let app = express();
let port = 3000;
let hostAddr = 'localhost'


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/employee', RoutesInstance.employee);
app.use('/product', RoutesInstance.product);
app.use('/', RoutesInstance.docs);


app.listen(port, hostAddr);
console.log('Express app listening on ' + hostAddr + ':' + port);