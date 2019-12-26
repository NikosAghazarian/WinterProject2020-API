//const DocsController = require('./controllers/docs-controller');
//const ProductController = require('./controllers/product-controller');
//const EmployeeController = require('./controllers/employee-controller');
//import { DocsController } from "./controllers/docs-controller.js";
//import { ProductController } from "./controllers/product-controller";
//import { EmployeeController } from "./controllers/employee-controller.";

const Router = require('express').Router;

import { 
    DocsController, 
    ProductController, 
    EmployeeController 
} from "./controllers/index.js";


const docsRouter = Router();
const productRouter = Router();
const employeeRouter = Router();


docsRouter.get('/C/', DocsController.create);
docsRouter.get('/R/', DocsController.read);
docsRouter.get('/U/', DocsController.update);
docsRouter.get('/D/', DocsController.delete);

productRouter.get('/C/', ProductController.create);
productRouter.get('/R/', ProductController.read);
productRouter.get('/U/', ProductController.update);
productRouter.get('/D/', ProductController.delete);

employeeRouter.get('/C/', EmployeeController.create);
employeeRouter.get('/R/', EmployeeController.read);
employeeRouter.get('/U/', EmployeeController.update);
employeeRouter.get('/D/', EmployeeController.delete);


export class Routes {

    docs = docsRouter;
    product = productRouter;
    employee = employeeRouter;

    constructor() {}

}