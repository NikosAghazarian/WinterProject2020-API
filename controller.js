const mysql = require('mysql');

exports.employees = (req, res, next) => {
    res.send('results')
}
exports.home = (req, res, next) => {
    res.send('API DOCs');
}