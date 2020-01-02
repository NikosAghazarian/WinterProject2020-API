import { QueryRelay } from "../query-relay.js";
let dbRelay = new QueryRelay();

export class TxnDataController {

    constructor() {}

    
    Create(req, res, next) {
        /*req.query.rows
            {
                "rows": [
                    {"trackedobject": "iron filament", "timestamp": "2020-01-02 12:00:00", "rsc": "iron filament", "qtyin": 3, "qtyout": 2, "lossreason": "", "employee": "will", "txntype": "production"},
                    {"trackedobject": "wood planks", "timestamp": "2020-01-02 11:00:00", "rsc": "wood planks", "qtyin": 2, "qtyout": 1, "lossreason": "", "employee": "miller", "txntype": "production"},
                    ...
                ]
            }
        */
        let rows = JSON.parse(req.query.rows).rows;
        let insertTemplate = `INSERT INTO txndata (trackedobject, timestamp, rsc, qtyin, qtyout, lossreason, employee, txntype) VALUES`;

        rows.forEach((row) => {
            insertTemplate = insertTemplate.concat(` ('${row.trackedobject}', '${row.timestamp}', '${row.rsc}', '${row.qtyin}', '${row.qtyout}', '${row.lossreason}', '${row.employee}', '${row.txntype}'),`);
        });
        insertTemplate = insertTemplate.slice(0, -1);

        dbRelay.DbQuery(insertTemplate, (error, results, fields) => {
            if (error) {
                res.send(error);
                console.log(error);
            }
            else {
                console.log(results);
                res.send('Query OK');
            }
        });
    }

    Read(req, res, next) {
        let selectTemplate = `SELECT * FROM txndata`;
        dbRelay.DbQuery(selectTemplate, (error, results, fields) => {
            if (error) {
                res.send(error);
                console.log(error);
            }
            else {
                res.send(results);
            }
        });
    }

    Update(req, res, next) {
        let updateTemplate = `UPDATE employee $SET_WHERE$`;

        let setWhereTemplate = `
        SET 'name' = ${newVal} 
        WHERE 'name' = ${originalVal}`;
        
        return setWhereTemplate;
    }

    Delete(req, res, next) {
        
    }
}