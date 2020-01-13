const mongoose = require('mongoose');
const timestamp = require('../helpers/timestamp');

const { Schema } = mongoose;

const productSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    categories: { type: Array, required: true,
        validate: {
            validator: function(Array){
                return Array.length >=1;
            },
            message: 'there must be at least one category'
        }
    },
},
{ 
    versionKey: false,
});

productSchema.plugin(timestamp);

productSchema.statics.sendProducts = sendProducts;
productSchema.statics.sendProductId = sendProductId;
productSchema.statics.createProduct = createProduct;
productSchema.statics.updatedProductId = updatedProductId;
productSchema.statics.deleteProductId = deleteProductId;

async function sendProducts(name) {
    if(name) {
       return this.findOne({name});
    };

    return this.find();
};

async function sendProductId(id) {
    try{
        return await this.findById(id);
    } catch(err){
        return null;
    };
};

async function createProduct(body) {
    try {
        return await this({
            _id: new mongoose.Types.ObjectId,
            ...body,
        });
    } catch(err){
        throw err;
    };    
};

async function updatedProductId(id, body) {
    try{
        return await this.findOneAndUpdate(
            { _id: id },
            body,
            { new: true },
        );
    } catch(err) {
        return null;
    }
};

async function deleteProductId (id) {
    try{
        return await this.findByIdAndDelete(id);
    }catch (err) {
        return null;
    }
};



const productsModel = mongoose.model('Product', productSchema);
module.exports = productsModel;