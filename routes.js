const CreateController = require('./controllers/create-controller');
const ReadController = require('./controllers/read-controller');
const UpdateController = require('./controllers/update-controller');
const DeleteController = require('./controllers/delete-controller');

const docs = require('express').Router();
const employee = require('express').Router();


docs.get('/C/', CreateController.docs);
docs.get('/R/', ReadController.docs);
docs.get('/U/', UpdateController.docs);
docs.get('/D/', DeleteController.docs);

employee.get('/C/', CreateController.docs);
employee.get('/R/', ReadController.docs);
employee.get('/U/', UpdateController.docs);
employee.get('/D/', DeleteController.docs);

product.get('/C/', CreateController.docs);
product.get('/R/', ReadController.docs);
product.get('/U/', UpdateController.docs);
product.get('/D/', DeleteController.docs);


module.exports = {
    product: product,
    employee: employee,
    docs: docs
}