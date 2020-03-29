import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require('express');

let Router = express.Router;

import { 
    DocsController,
    RscController,
    ProductController,
    LossReasonController,
    EmployeeController,
    TrackedObjectController,
    TxnDataController
} from "./controllers/index.js";

//import * as ControllerSet from "./controllers/index.js";

const DocsControllerInstance = new DocsController();
const RscControllerInstance = new RscController();
const ProductControllerInstance = new ProductController();
const LossReasonControllerInstance = new LossReasonController();
const EmployeeControllerInstance = new EmployeeController();
const TrackedObjectControllerInstance = new TrackedObjectController();
const TxnDataControllerInstance = new TxnDataController();

const docsRouter = Router();
const rscRouter = Router();
const productRouter = Router();
const lossReasonRouter = Router();
const employeeRouter = Router();
const trackedObjectRouter = Router();
const txnDataRouter = Router();

// Should have done this with POST, GET, PATCH, and DELETE
docsRouter.get('/', DocsControllerInstance.DisplayDocs);

rscRouter.get('/C/', RscControllerInstance.Create);
rscRouter.get('/R/', RscControllerInstance.Read);
rscRouter.get('/U/', RscControllerInstance.Update);
rscRouter.get('/D/', RscControllerInstance.Delete);

productRouter.post('/C/', ProductControllerInstance.Create);
productRouter.get('/R/', ProductControllerInstance.Read);
productRouter.get('/U/', ProductControllerInstance.Update);
productRouter.get('/D/', ProductControllerInstance.Delete);

lossReasonRouter.post('/C/', LossReasonControllerInstance.Create);
lossReasonRouter.get('/R/', LossReasonControllerInstance.Read);
lossReasonRouter.get('/U/', LossReasonControllerInstance.Update);
lossReasonRouter.get('/D/', LossReasonControllerInstance.Delete);

employeeRouter.get('/C/', EmployeeControllerInstance.Create);
employeeRouter.get('/R/', EmployeeControllerInstance.Read);
employeeRouter.get('/U/', EmployeeControllerInstance.Update);
employeeRouter.get('/D/', EmployeeControllerInstance.Delete);

trackedObjectRouter.get('/C/', TrackedObjectControllerInstance.Create);
trackedObjectRouter.get('/R/', TrackedObjectControllerInstance.Read);
trackedObjectRouter.get('/U/', TrackedObjectControllerInstance.Update);
trackedObjectRouter.get('/D/', TrackedObjectControllerInstance.Delete);

txnDataRouter.get('/C/', TxnDataControllerInstance.Create);
txnDataRouter.get('/R/', TxnDataControllerInstance.Read);
txnDataRouter.get('/U/', TxnDataControllerInstance.Update);
txnDataRouter.get('/D/', TxnDataControllerInstance.Delete);


export class Routes {

    docs = docsRouter;
    rsc = rscRouter;
    product = productRouter;
    lossReason = lossReasonRouter;
    employee = employeeRouter;
    trackedObject = trackedObjectRouter;
    txnData = txnDataRouter;

    constructor() {}

}