/* eslint-disable max-len */
import { QueryRelay } from '../query-relay.js';
import { Utils } from './controller-util.js';

const dbRelay = new QueryRelay();

export class TxnDataController {

    constructor() {}

    
    Create(req, res) {
        /*
         *  {
         *      'rows': [
         *          {'trackedobject': 'iron filament', 'timestamp': '2020-01-02 12:00:00', 'rsc': 'iron filament', 'qtyin': 3, 'qtyout': 2, 'lossreason': '', 'employee': 'will', 'txntype': 'production'},
         *          {'trackedobject': 'wood planks', 'timestamp': '2020-01-02 11:00:00', 'rsc': 'wood planks', 'qtyin': 2, 'qtyout': 1, 'lossreason': '', 'employee': 'miller', 'txntype': 'production'}
         *      ]
         *  }
         */
        const insertTemplate = `INSERT INTO txndata (trackedobject, timestamp, rsc, qtyin, qtyout, lossreason, employee, txntype) VALUES ?;`;

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
        const selectTemplate = `SELECT * FROM txndata`;
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
            updateTemplate = `UPDATE txndata SET`;

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