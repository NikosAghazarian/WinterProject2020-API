export class DocsController {

    constructor() {}

    DisplayDocs(req, res, next) {
        res.send(`
        DOCS GO HERE
        https://swagger.io/specification/ : auto-docs
        Add JSdoc too
        `);
        return;
    }

    
}