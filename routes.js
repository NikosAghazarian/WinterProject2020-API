const controller = require('./controller');

const employees = require('express').Router();


employees.get('/', controller.employees);


module.exports = {
    employees: employees
}