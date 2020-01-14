const { Router } = require('express');
const ordersVallidator = require('./orders.vallidator');
const ordersController = require('./orders.controller');

const router = Router();

router
.get('/', ordersVallidator.sendOrders,
ordersController.sendOrders)
.get('/:id', ordersController.sendOrderId)
.post('/', ordersVallidator.createOrder,
ordersController.createOrder)
.put('/:id', ordersVallidator.updatedOrderId,
ordersController.updatedOrderId)
.delete('/:id', ordersController.deleteOrderId);

module.exports = router;