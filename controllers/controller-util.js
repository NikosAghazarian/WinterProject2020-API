export class Utils {
    static CreationParse(req,) {
        let rows = req.body.rows;
        let boundParams = [];
        rows.forEach((row) => {
            let rowArr = [];
            for (let key in row) {
                rowArr.push(row[key]);
            }
            boundParams.push(rowArr);
        });
        return boundParams;
    }
}