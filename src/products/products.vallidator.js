const validator = require('node-validator');

class ProductsVallidator {
    constructor() {};

    get sendProducts() {
        return this._sendProducts.bind(this);
    };

    async _sendProducts(req, res, next){
        const url = req.url;
        const nameQuery = req.query.name;

        if(!url.includes('?')){
            return next();
        } else if(url.includes('?') && nameQuery) {
            const name = nameQuery.split(",");

            if(name.length !== 1 ) {
                return res.status(400).json('SmartBin: Invalid URL');
            };

            return next();
        } else {
            return res.status(400).json('SmartBin: Invalid URL');
        };
    };

    get createProduct () {
        return this._createProduct.bind(this);
    };

    async _createProduct(req, res, next){
        const url = req.url;
        if(url.includes('?')){
            return res.status(400).json('SmartBin: Invalid URL');
        };

        const createProductRules = validator.isObject()
        .withRequired("name", validator.isString())
        .withRequired("description", validator.isString())
        .withRequired("price", validator.isNumber())
        .withRequired("currency", validator.isString())
        .withRequired("categories", validator.isArray(validator.isString(), {min: 1}))

        validator.run(createProductRules, req.body, (errCount, errors) => {
            if(errCount) {
                return res.status(400).json(errors);
            };
            return next();
        });
    };

    get updatedProductId() {
        return this._updatedProductId.bind(this);
    };

    async _updatedProductId(req, res, next){
        const url = req.url;
        if(url.includes('?')){
            return res.status(400).json('SmartBin: Invalid URL');
        };

        const updatedProductIdRules = validator.isObject()
        .withOptional("name", validator.isString())
        .withOptional("description", validator.isString())
        .withOptional("price", validator.isNumber())
        .withOptional("currency", validator.isString())
        .withOptional("categories", validator.isArray(validator.isString(), {min: 1}))

        validator.run(updatedProductIdRules, req.body, (errCount, errors) => {
            if(errCount) {
                return res.status(400).json(errors);
            };
            return next();
        });

    };

};

module.exports = new ProductsVallidator();