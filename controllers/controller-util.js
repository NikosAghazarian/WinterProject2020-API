export class Utils {
    static CreationParse(req,) {
        const rows = req.body.rows;
        const boundParams = [];
        rows.forEach((row) => {
            const rowArr = [];
            let key;
            for (key in row) {
                rowArr.push(row[key]);
            }
            boundParams.push(rowArr);
        });
        return boundParams;
    }
}