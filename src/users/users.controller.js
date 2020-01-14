const UsersModel = require('./users.model');

class UsersController {
    constructor() {};

    get sendUsers() {
        return this._sendUsers.bind(this);
    };

    async _sendUsers(req, res, next) {
        try {
            const users = await UsersModel.sendUsers(req);

            if(!users) {
                return res.status(404).json({'status': 'faield', 'users': 'no users'});
            };

            return res.status(200).json({'status': 'success', 'users': users});

        } catch (err) {
            return next(err);
        };
    };

    get sendUserId() {
        return this._sendUserId.bind(this);
    };

    async _sendUserId(req, res, next) {
        try {
            const user = await UsersModel.sendUserId(req);

            if(!user) {
                return res.status(404).json({'status': 'faield', 'user': 'no user'});
            }; 
            return res.status(200).json({'status': 'success', 'user': user}); 

        } catch (err) {
            return next(err);
        };
    };

    get createUser() {
        return this._createUser.bind(this);
    };

    async _createUser(req, res, next) {
        try {
            const user = await UsersModel.createUser(req);

            await user.save((err, data) => {
                if(err) throw err;
                
                return res.status(201).json({'status': 'success', 'user': data});
                });
            } catch(err) {
                return next(err);
            };   
        };

    get deleteUserId() {
        return this._deleteUserId.bind(this);
    };

    async _deleteUserId(req, res, next) {
        const id = req.params.id;
        try {
            const user = await UsersModel.deleteUserId(id);

            if(!user) {
                return res.status(404).json({'status': 'faield', 'user': 'no user'});
            };

            return res.status(200).json({'status': 'success delete', 'userDelete': user});
        } catch (err) {
            return next(err);
        };
    };

    get updateUserId() {
        return this._updateUserId.bind(this);
    };

    async _updateUserId(req,res, next) {
        const id = req.params.id;
        const bodyUser = {
            ...req.body,
            'updatedAt': Date.now()
        };
        try {
           const updateUser = await UsersModel.updateUserId(id, bodyUser);

           if(!updateUser) {
            return res.status(404).json({'status': 'faield', 'user': 'no user update or no products for update'});
           };

            return res.status(200).json({'status': 'success updated', 'userUpdated': updateUser});

        } catch(err) {
            return next(err);
        };
    };
};

module.exports = new UsersController();