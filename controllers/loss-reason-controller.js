import { QueryRelay } from "../query-relay.js";
let dbRelay = new QueryRelay();

export class LossReasonController {

    constructor() {}

    
    Create(req, res, next) {
        /*req.query.rows
            {
                "rows": [
                    {"name": "joe"},
                    {"name": "dave"},
                    ...
                ]
            }
        */
        let rows = JSON.parse(req.query.rows).rows;
        let insertTemplate = `INSERT INTO lossreason (name) VALUES`;

        rows.forEach((row) => {
            insertTemplate = insertTemplate.concat(` ('${row.name}'),`);
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
        let selectTemplate = `SELECT * FROM lossreason`;
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