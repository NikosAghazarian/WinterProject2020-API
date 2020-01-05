import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mysql = require('mysql');
const ServerAuth = require('./ServerAuth.json')


export class QueryRelay {
    
    constructor() {}

    isConnected = false;
    connectionParams = {
        host: ServerAuth.host,
        database: ServerAuth.database,
        user: ServerAuth.user,
        password: ServerAuth.password
    };
    connection;


    DbQuery(query, queryCallback) {
        if (this.isConnected === false) {
            this.connection = mysql.createConnection(this.connectionParams);
            this.isConnected = true;
            this.connection.connect();
        }
        this.connection.query(query, queryCallback);
        setTimeout(this.EndConnection, 10000);
    }

    EndConnection() {
        if (this.isConnected === true) {
            this.connection.end();
            this.isConnected = false;
        }
    }
}