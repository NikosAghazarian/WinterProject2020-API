import { QueryRelay } from "../query-relay.js";
import { Utils } from "./controller-util.js";

let dbRelay = new QueryRelay();

export class RscController {

    constructor() {}
    
    
    Create(req, res, next) {
        /*
            {
                "rows": [
                    {"name": "iron filament", "expectedyield": 1, "minyield": 0, "runsize": 50},
                    {"name": "wood planks", "expectedyield": 5, "minyield": 0, "runsize": 20}
                ]
            }
        */
        let insertTemplate = `INSERT INTO rsc (name, expectedyield, minyield, runsize) VALUES ?;`;

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
        let selectTemplate = `SELECT * FROM rsc`;
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
        let rows = JSON.parse(req.query.rows).rows;
        let updateTemplate;
        let targetPrimaryKey;
        let targetPrimaryKeyValue;
        let targetUpdateKeys;

        rows.forEach((row) => {
            updateTemplate = `UPDATE rsc SET`;

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