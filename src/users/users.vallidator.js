const validator = require('node-validator');

class UsersVallidator {
    constructor() {};

    get sendUsers() {
        return this._sendUsers.bind(this);
    };

    async _sendUsers(req, res, next) {
        const url = req.url;
        const emailQuery = req.query.email;

        if(!url.includes('?')){
            return next();
        } else if(url.includes('?') && emailQuery) {
            const email = emailQuery.split(",");
            if(email.length === 1) {
                return next();
            } else {
                return res.status(400).json('SmartBin: Invalid URL');
            }
        } else {
            return res.status(400).json('SmartBin: Invalid URL');
        };
    };

    get createUser() {
        return this._createUser.bind(this);
    };

    async _createUser(req, res, next){
        const url = req.url;

        if(url.includes('?')){
            return res.status(400).json('SmartBin: Invalid URL');
        };

        const createUserRules = validator.isObject()
        .withRequired("name", validator.isString())
        .withRequired("email", validator.isString({ regex: /@/i }))
        .withRequired("tel", validator.isNumber())

        validator.run(createUserRules, req.body, (errCount, errors) => {
            if(errCount) {
                return res.status(400).json(errors);
            };
            return next();
        });
    };

    get updateUserId() {
        return this._updateUserId.bind(this);
    };

    async _updateUserId(req, res, next){

        const updateUserIdRules = validator.isObject()
        .withOptional("name", validator.isString())
        .withOptional("email", validator.isString({ regex: /@/i }))
        .withOptional("tel", validator.isNumber())
        .withOptional("favoriteProducts", validator.isArray(validator.isString(), {min: 1}))
        .withOptional("viewedProducts", validator.isArray(validator.isString(), {min: 1}))
        .withOptional("orders", validator.isArray(validator.isString(), {min: 1}));

        validator.run(updateUserIdRules, req.body, (errCount, errors) => {
            if(errCount) {
                return res.status(400).json(errors);
            };
            return next();
        });
    };
};

module.exports = new UsersVallidator();