import { QueryRelay } from "../query-relay.js";
let dbRelay = new QueryRelay();

export class EmployeeController {

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
        let insertTemplate = `INSERT INTO employee (name) VALUES`;
        
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
        let selectTemplate = `SELECT * FROM employee`;
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
                    { "key": {"name": "joe"}, "newValue": {"name": "joseph"} },
                    { "key": {"name": "dan"}, "newValue": {"name": "daniel"} },
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
           updateTemplate = `UPDATE employee SET`;

           targetPrimaryKey = Object.getOwnPropertyNames(row.key)[0];
           targetPrimaryKeyValue = row.key[targetPrimaryKey];

           targetUpdateKeys = Object.getOwnPropertyNames(row.newValue);

           targetUpdateKeys.forEach(key => {
               updateTemplate = updateTemplate.concat(` ${key} = '${row.newValue[key]}',`);
           });
           updateTemplate = updateTemplate.slice(0, -1); //cleans up last stray comma between set and where
           
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
        /*req.query.rows
            {
                "rows": [
                    {"name": "joe"},
                    {"name": "dan"},
                    ...
                ]
            }
        */
        let rows = JSON.parse(req.query.rows).rows;
        let deleteTemplate = `DELETE FROM employee WHERE`;

        rows.forEach((row) => {
            deleteTemplate = deleteTemplate.concat(` (name = '${row.name}') OR`);
        });
        deleteTemplate = deleteTemplate.slice(0, -3);

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
    }

}