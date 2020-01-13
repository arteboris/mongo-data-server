const { Router } = require('express');
const productsVallidator = require('./products.vallidator');
const productsController = require('./products.controller.js');

const router = Router();

router
.get('/', productsVallidator.sendProducts,
productsController.sendProducts)
.get('/:id', productsController.sendProductId)
.post('/', productsVallidator.createProduct,
productsController.createProduct)
.put('/:id', productsVallidator.updatedProductId,
productsController.updatedProductId)
.delete('/:id', productsController.deleteProductId);

module.exports = router;