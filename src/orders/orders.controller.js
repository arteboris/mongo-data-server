const ordersModel = require('./orders.model');

class OrdersController {
    constructor() {};

    get sendOrders() {
        return this._sendOrders.bind(this);
    };

    async _sendOrders(req, res, next){
        const creator = req.query.creator;
        try {
            const orders = await ordersModel.sendOrders(creator);
            if(!orders){
                return res.status(404).json({'status': 'failed', 'orders': 'no orders'});
            };
            return res.status(200).json({'status': 'success', 'orders': orders});
        } catch(err){
            return next(err);
        };
    };

    get sendOrderId() {
        return this._sendOrderId.bind(this);
    };

    async _sendOrderId(req, res, next) {
        const id = req.params.id;
        try{
            const order = await ordersModel.sendOrderId(id);
            if(!order){
                return res.status(404).json({'status': 'failed', 'order': 'no such order'});
            };
            return res.status(200).json({'status': 'success', 'order': order});
        } catch (err) {
            return next(err);
        };
    };

    get createOrder() {
        return this._createOrder.bind(this);
    };

    async _createOrder(req, res, next){
        const body = req.body;
        try{
            const order = await ordersModel.createOrder(body);
            console.log(order);
            await order.save((err, data) => {
                if(err) return res.status(400).json(err);
                return res.status(201).json({'status': 'success', 'order': order});
            });
        }catch(err){
            return next(err);
        };
    };

    get updatedOrderId() {
        return this._updatedOrderId.bind(this);
    };

    async _updatedOrderId(req, res, next){
        const id = req.params.id;
        const body = {
            ...req.body,
            'updatedAt': Date.now(),
        };
        try{
            const updatedOrder = await ordersModel.updatedOrderId(id, body);
            if(!updatedOrder){
                return res.status(404).json({'status': 'failed', 'order': 'no such order'});
            }
            return res.status(200).json({'status': 'success', 'updated order': updatedOrder});
        } catch(err){
            return res.status(404).json(err);
        };
    };

    get deleteOrderId() {
        return this._deleteOrderId.bind(this);
    };

    async _deleteOrderId(req, res, next) {
        const id = req.params.id;
        try{
            const deletedOrder = await ordersModel.deleteOrderId(id);
            if(!deletedOrder){
                return res.status(404).json({'status': 'failed', 'order': 'order not deleted, please check details'});
            };
            return res.status(200).json({'status': 'success deleted', 'order deleted': deletedOrder});
        } catch(err){
            return next(err);
        };
    };
};

module.exports = new OrdersController();