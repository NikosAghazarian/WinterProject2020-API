import { QueryRelay } from '../query-relay.js';
import { Utils } from './controller-util.js';

const dbRelay = new QueryRelay();

export class EmployeeController {

    constructor() {}
    

    Create(req, res) {
        /*
         *{
         *      'rows': [
         *          {'name': 'joe'},
         *          {'name': 'dave'}
         *      ]
         *  }
         */
        const insertTemplate = `INSERT INTO employee (name) VALUES ?;`;

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

    Read(req, res) {
        const selectTemplate = `SELECT * FROM employee`;
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
        /*
         *  {
         *      'rows': [
         *          { 'key': {'name': 'joe'}, 'newValue': {'name': 'joseph'} },
         *          { 'key': {'name': 'dan'}, 'newValue': {'name': 'daniel'} },
         *          ...
         *      ]
         *  }
         */
        const rows = JSON.parse(req.query.rows).rows;
        let updateTemplate;
        let targetPrimaryKey;
        let targetPrimaryKeyValue;
        let targetUpdateKeys;

        rows.forEach((row) => {
            updateTemplate = `UPDATE employee SET`;

            targetPrimaryKey = Object.getOwnPropertyNames(row.key)[0];
            targetPrimaryKeyValue = row.key[targetPrimaryKey];

            targetUpdateKeys = Object.getOwnPropertyNames(row.newValue);

            targetUpdateKeys.forEach((key) => {
                updateTemplate = updateTemplate.concat(` ${key} = '${row.newValue[key]}',`);
            });
            updateTemplate = updateTemplate.slice(0, -1); // Cleans up last stray comma between set and where
           
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

    Delete(req, res) {
        /**
         *  {
         *      'rows': [
         *          {'name': 'joe'},
         *          {'name': 'dan'},
         *          ...
         *      ]
         *  }
         */
        const rows = JSON.parse(req.query.rows).rows;
        let deleteTemplate = `DELETE FROM employee WHERE`;

        rows.forEach((row) => {
            deleteTemplate = deleteTemplate.concat(` (name = '${row.name}') OR`);
        });
        deleteTemplate = deleteTemplate.slice(0, -3);

        dbRelay.DbQuery(deleteTemplate, (error, results) => {
            if (error) {
                res.send(error);
                console.log(error);
            } else {
                console.log(results);
                res.send('Query OK');
            }
        });
    }

}