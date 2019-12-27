//const DocsController = require('./controllers/docs-controller');
//const ProductController = require('./controllers/product-controller');
//const EmployeeController = require('./controllers/employee-controller');
//import { DocsController } from "./controllers/docs-controller.js";
//import { ProductController } from "./controllers/product-controller";
//import { EmployeeController } from "./controllers/employee-controller.";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require('express');
//import { Express } from "express";
let Router = express.Router;

import { 
    DocsController, 
    ProductController, 
    EmployeeController 
} from "./controllers/index.js";

const DocsControllerInstance = new DocsController();
const ProductControllerInstance = new ProductController();
const EmployeeControllerInstance = new EmployeeController();

const docsRouter = Router();
const productRouter = Router();
const employeeRouter = Router();


docsRouter.get('/', DocsControllerInstance.DisplayDocs);

productRouter.get('/C/', ProductControllerInstance.Create);
productRouter.get('/R/', ProductControllerInstance.Read);
productRouter.get('/U/', ProductControllerInstance.Update);
productRouter.get('/D/', ProductControllerInstance.Delete);

employeeRouter.get('/C/', EmployeeControllerInstance.Create);
employeeRouter.get('/R/', EmployeeControllerInstance.Read);
employeeRouter.get('/U/', EmployeeControllerInstance.Update);
employeeRouter.get('/D/', EmployeeControllerInstance.Delete);


export class Routes {

    docs = docsRouter;
    product = productRouter;
    employee = employeeRouter;

    constructor() {}

}