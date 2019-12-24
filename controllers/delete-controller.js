const QueryRelay = require('../query-relay');

exports.employees = (req, res, next) => {
    res.send('results')
}
exports.docs = (req, res, next) => {
    res.send('API DOCs');
}