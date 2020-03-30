import { QueryRelay } from '../query-relay.js';
import { Utils } from './controller-util.js';

const dbRelay = new QueryRelay();

export class TrackedObjectController {

    constructor() {}

    
    Create(req, res) {
        /*
         *{
         *    'rows': [
         *        {'name': 'iron filament', 'product': 'screw', 'qty': 5, 'minyield': 0, 'startqty': 7},
         *        {'name': 'wood planks', 'product': 'wooden dowel', 'qty': 2, 'minyield': 0, 'startqty': 4}
         *    ]
         *}
         */
        const insertTemplate = `INSERT INTO trackedobject (name, product, qty, minyield, startqty) VALUES ?;`;

        const boundParams = Utils.CreationParse(req);

        dbRelay.DbQuery(insertTemplate, (error, results) => {
            if (error) {
                res.send(error);
                console.log(error);
            } else {
                console.log(results);
                res.send('Query OK');
            }
        }, boundParams);
    }

    Read(res) {
        const selectTemplate = `SELECT * FROM trackedobject`;
        dbRelay.DbQuery(selectTemplate, (error, results) => {
            if (error) {
                res.send(error);
                console.log(error);
            } else {
                res.send(results);
            }
        });
    }

    Update(req, res) {
        const rows = JSON.parse(req.query.rows).rows;
        let updateTemplate;
        let targetPrimaryKey;
        let targetPrimaryKeyValue;
        let targetUpdateKeys;

        rows.forEach((row) => {
            updateTemplate = `UPDATE trackedobject SET`;

            targetPrimaryKey = Object.getOwnPropertyNames(row.key)[0];
            targetPrimaryKeyValue = row.key[targetPrimaryKey];

            targetUpdateKeys = Object.getOwnPropertyNames(row.newValue);

            targetUpdateKeys.forEach((key) => {
                updateTemplate = updateTemplate.concat(` ${key} = '${row.newValue[key]}',`);
            });
            updateTemplate = updateTemplate.slice(0, -1);
            
            updateTemplate = updateTemplate.concat(` WHERE ${targetPrimaryKey} = '${targetPrimaryKeyValue}';`);

            dbRelay.DbQuery(updateTemplate, (error, results) => {
                if (error) {
                    res.send(error);
                    console.log(error);
                } else {
                    console.log(results);
                    res.send('Query OK');
                }
            });
        });
    }

    Delete() {
        
    }
}