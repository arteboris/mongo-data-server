const productsModel = require('./products.model');

class ProductsController {
    constructor() {};

    get sendProducts() {
        return this._sendProducts.bind(this);
    };

    async _sendProducts(req, res, next){
        const name = req.query.name;
        try{
           const products = productsModel.sendProducts(name);

           if(!products) {
               return res.status(404).json({'status': 'failed', 'products': 'no products'})
           };

           return res.status(200).json({'status': 'success', 'products': products });

        } catch(err) {
            return next(err);
        };
    };

    get sendProductId() {
        return this._sendProductId.bind(this);
    };

    async _sendProductId(req, res, next){
        const id = req.params.id;

        try{
            const product = await productsModel.sendProductId(id);

            if(!product){
                return res.status(404).json({'status': 'failed', 'product': 'no product'});
            };

            return res.status(200).json({'status': 'success', 'product': product});

        } catch(err){
            return next(err);
        };
    };

    get createProduct () {
        return this._createProduct.bind(this);
    };

    async _createProduct(req, res, next){
        const body = req.body;
        try{
            const product = await productsModel.createProduct(body);

            await product.save((err, data) => {
                if (err) throw err;

                return res.status(201).json({'status': 'success', 'product': data});
            });
        }catch(err){
            return next(err);
        };
    };

    get updatedProductId() {
        return this._updatedProductId.bind(this);
    };

    async _updatedProductId(req, res, next){
        const id = req.param.id;
        const body = req.body;
        try{
            const updateProduct = await productsModel.updatedProductId(id, body);

            if(!updateProduct){
                return res.status(404).json({'status': 'failed', 'product': 'no product updated'});
            };
            return res.status(200).json({'status': 'success updated', 'product updated': updateProduct});
        } catch(err){
            return next(err);
        };
    };

    get deleteProductId() {
        return this._deleteProductId.bind(this);
    };

    async _deleteProductId(req, res, next){
        const id = req.params.id;
        try{
            const deleteProduct = await productsModel.deleteProductId(id);

            if(!deleteProduct){
                return res.status(404).json({'status': 'failed', 'product': 'no product delete'});
            };

            return res.status(200).json({'status': 'success delete', 'product delete': deleteProduct});
        } catch(err) {
            next(err);
        };
    };

};

module.exports = new ProductsController();