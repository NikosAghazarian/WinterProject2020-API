import { QueryRelay } from "../query-relay.js";
let dbRelay = new QueryRelay();

export class TrackedObjectController {

    constructor() {}

    
    Create(req, res, next) {
        /*req.query.rows
            {
                "rows": [
                    {"name": "iron filament", "product": "screw", "qty": 5, "minyield": 0, "startqty": 7},
                    {"name": "wood planks", "product": "wooden dowel", "qty": 2, "minyield": 0, "startqty": 4},
                    ...
                ]
            }
        */
        let rows = JSON.parse(req.query.rows).rows;
        let insertTemplate = `INSERT INTO trackedobject (name, product, qty, minyield, startqty) VALUES`;

        rows.forEach((row) => {
            insertTemplate = insertTemplate.concat(` ('${row.name}', '${row.product}', '${row.qty}', '${row.minyield}', '${row.startqty}'),`);
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
        let selectTemplate = `SELECT * FROM trackedobject`;
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