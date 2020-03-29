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
    callbackWaitFlag;

    /**
     * Queries the database for information requested from the API.
     * 
     * @param  {String} query
     * @param  {Function} queryCallback
     * @param  {Array<Array<any>>} [params]
     */
    DbQuery(query, queryCallback, params) {
        if (this.isConnected === false) {
            this.connection = mysql.createConnection(this.connectionParams);
            this.isConnected = true;
            this.connection.connect();
        }
        if (params) {
            this.connection.query(query, [params], queryCallback);
        }
        else {
            this.connection.query(query, queryCallback);
        }
        if (this.callbackWaitFlag === false) { //prevents buildup of callbacks
            setTimeout(this.EndConnection, 10000);
            this.callbackWaitFlag = true;
        }
    }
    /**
     * Callback to end connection to DB after a duration
     * to save on connection opening and closing cost.
     */
    EndConnection() {
        if (this.isConnected === true) {
            this.connection.end();
            this.isConnected = false;
            this.callbackWaitFlag = false;
        }
    }
}