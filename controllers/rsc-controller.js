import { QueryRelay } from "../query-relay.js";


export class RscController {

    constructor() {}
    dbRelay = new QueryRelay();
    
    Create(req, res, next) {
        let rows = JSON.parse(req.query.rows).rows;
        let insertTemplate = `INSERT INTO product (name) VALUES`;

        rows.forEach((nameToAdd) => {
            insertTemplate = insertTemplate.concat(` ('${nameToAdd}'),`);
        });
        insertTemplate = insertTemplate.slice(0, -1);

        this.dbRelay.DbQuery(insertTemplate, (error, results, fields) => {
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
        let updateTemplate = `UPDATE employee $SET_WHERE$`;

        let setWhereTemplate = `
        SET 'name' = ${newVal} 
        WHERE 'name' = ${originalVal}`;
        
        return setWhereTemplate;
    }

    Delete(req, res, next) {
        
    }
}