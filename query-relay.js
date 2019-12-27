import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mysql = require('mysql');
const ServerAuth = require('./ServerAuth.json')


export class QueryRelay {
    
    constructor() {}

    DbQuery(query, queryCallback) {
        const connection = mysql.createConnection({
            host: ServerAuth.host,
            user: ServerAuth.user,
            password: ServerAuth.password,
        });
        connection.connect();
        connection.query(query, queryCallback);
        connection.end();
    }
}