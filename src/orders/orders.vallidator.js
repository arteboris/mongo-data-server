const validator = require('node-validator');

class OrdersVallidator {
    constructor() {};

    get sendOrders() {
        return this._sendOrders.bind(this);
    };

    async _sendOrders(req, res, next){
        const url = req.url;
        if(url.includes('?')){
            return res.status(400).json('SmartBin: Invalid URL');
        };
        return next();
    };

    get createOrder() {
        return this._createOrder.bind(this);
    };

    async _createOrder(req, res, next){
        const url = req.url;
        if(url.includes('?')) {
            return res.status(400).json('SmartBin: Invalid URL');
        };

        const checkChild = validator.isObject()
        .withRequired("product", validator.isString())
        .withRequired("type", validator.isString())
        .withRequired("itemsCount", validator.isNumber());

        const createOrderRules = validator.isObject()
        .withRequired("creator", validator.isString())
        .withRequired("productsList", validator.isArray(checkChild, {min: 1}))
        .withRequired("deliveryType", validator.isString())
        .withRequired("deliveryAdress", validator.isString())
        .withRequired("sumToPay", validator.isNumber())
        .withRequired("status", validator.isString());

        validator.run(createOrderRules, req.body, (errCount, errors) => {
            if(errCount) {
                return res.status(400).json(errors);
            };
            return next();
        });
    };

    get updatedOrderId() {
        return this._updatedOrderId.bind(this);
    };

    async _updatedOrderId(req, res, next){
        const url = req.url;
        if(url.includes('?')){
            return res.status(400).json('SmartBin: Invalid URL');
        };
    
        const checkChild = validator.isObject()
        .withOptional("product", validator.isString())
        .withOptional("type", validator.isString())
        .withOptional("itemsCount", validator.isNumber());

        const updatedOrderRules = validator.isObject()
        .withOptional("creator", validator.isString())
        .withOptional("productsList", validator.isArray(checkChild, {min: 1}))
        .withOptional("deliveryType", validator.isString())
        .withOptional("deliveryAdress", validator.isString())
        .withOptional("sumToPay", validator.isNumber())
        .withOptional("status", validator.isString());
        
        validator.run(updatedOrderRules, req.body, (errCount, errors) => {
            if(errCount) {
                return res.status(400).json(errors);
            };
            return next();
        });
    };
};

module.exports = new OrdersVallidator();