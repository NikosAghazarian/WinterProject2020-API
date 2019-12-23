const controller = require('./controller');

const home = require('express').Router();
const employees = require('express').Router();

home.get('/', controller.default);
employees.get('/', controller.employees);


module.exports = {
    employees: employees,
    home: home
}