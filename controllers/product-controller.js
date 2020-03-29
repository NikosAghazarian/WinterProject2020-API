import { QueryRelay } from "../query-relay.js";
import { Utils } from "./controller-util.js";

let dbRelay = new QueryRelay();

export class ProductController {

    constructor() {}
    
    
    Create(req, res, next) {
        /*
            {
                "rows": [
                    {"name": "screw", "expectedyield": 1, "minyield": 0, "ttl": 275},
                    {"name": "wooden dowel", "expectedyield": 5, "minyield": 0, "ttl": 107}
                ]
            }
        */
        let insertTemplate = `INSERT INTO product (name, expectedyield, minyield, ttl) VALUES ?;`;

        let boundParams = Utils.CreationParse(req);

        dbRelay.DbQuery(insertTemplate, (error, results, fields) => {
            if (error) {
                res.send(error);
                console.log(error);
            }
            else {
                console.log(results);
                res.send('Query OK');
            }
        }, boundParams);
    }

    Read(req, res, next) {
        let selectTemplate = `SELECT * FROM product`;
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
        /*req.query.rows
            {
                "rows": [
                    { "key": {"name": "screw"}, "newValue": {"expectedyield": 3, "minyield": 1, "ttl": 275} },
                    { "key": {"name": "wooden dowel"}, "newValue": {"name": "wood rod"} },
                    ...
                ]
            } 
        */
        let rows = JSON.parse(req.query.rows).rows;
        let updateTemplate;
        let targetPrimaryKey;
        let targetPrimaryKeyValue;
        let targetUpdateKeys;

        rows.forEach((row) => {
            updateTemplate = `UPDATE product SET`;

            targetPrimaryKey = Object.getOwnPropertyNames(row.key)[0];
            targetPrimaryKeyValue = row.key[targetPrimaryKey];

            targetUpdateKeys = Object.getOwnPropertyNames(row.newValue);

            targetUpdateKeys.forEach(key => {
                updateTemplate = updateTemplate.concat(` ${key} = '${row.newValue[key]}',`);
            });
            updateTemplate = updateTemplate.slice(0, -1);
            
            updateTemplate = updateTemplate.concat(` WHERE ${targetPrimaryKey} = '${targetPrimaryKeyValue}';`);

            dbRelay.DbQuery(updateTemplate, (error, results, fields) => {
                if (error) {
                   res.send(error);
                   console.log(error);
                }
                else {
                   console.log(results);
                   res.send('Query OK');
                }
            });
        });
    }

    Delete(req, res, next) {
        
    }
}