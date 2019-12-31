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
        
        
        
        let insertTemplate = `INSERT INTO employee (name) VALUES (${element})`;
    }

    Read(req, res, next) {
        let selectTemplate = `SELECT * FROM employee`;
        
    }

    Update(req, res, next) {
        let updateTemplate = `UPDATE employee $SET_WHERE$`;
    }

    Delete(req, res, next) {
        
    }

    GenerateSetWhere(newVal, originalVal) {
        let setWhereTemplate = `
        SET 'name' = ${newVal} 
        WHERE 'name' = ${originalVal}`;
        
        return setWhereTemplate;
    }
}