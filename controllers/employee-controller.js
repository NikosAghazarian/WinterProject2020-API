import { QueryRelay } from "../query-relay.js";
let dbRelay = new QueryRelay();

export class EmployeeController {

    constructor() {}
    

    Create(req, res, next) {
        /*req.query.names
            {
                names: [
                    "name1",
                    "name2",
                    ...
                ]
            }
        */
        let names = JSON.parse(req.query.names).names;
        let insertTemplate = `INSERT INTO employee (name) VALUES`;
        
        names.forEach((nameToAdd) => {
            insertTemplate = insertTemplate.concat(` ('${nameToAdd}'),`);
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
        let updateTemplate = `UPDATE employee $SET_WHERE$`;

        let setWhereTemplate = `
        SET 'name' = ${newVal} 
        WHERE 'name' = ${originalVal}`;
        
        return setWhereTemplate;
    }

    Delete(req, res, next) {
        
    }

}