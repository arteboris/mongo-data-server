const mongoose = require('mongoose');
const timestamp = require('../helpers/timestamp');

const { Schema } = mongoose;

const productsListSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["M", "XL", "XXL"],
    },
    itemsCount: {
        type: Number,
        required: true,
        min: 1,
    },
}, {
    _id: false,
});

const orderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    productsList: [productsListSchema],
    deliveryType: {
        type: String,
        required: true,
        enum: ["delivery", "office"],
    },
    deliveryAdress: {
        type: String,
        required: true,
    },
    sumToPay: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["inProgress", "declined", "finished", "failed"]
    },
},{
    versionKey: false,
});

orderSchema.plugin(timestamp);

orderSchema.statics.sendOrders = sendOrders;
orderSchema.statics.sendOrderId = sendOrderId;
orderSchema.statics.createOrder = createOrder;
orderSchema.statics.updatedOrderId = updatedOrderId;
orderSchema.statics.deleteOrderId = deleteOrderId;

async function sendOrders() {
    try{
        return await this.find();
    } catch(err){
        return null;
    };
};

async function sendOrderId(id){
    try{
        return await this.findById(id)
    } catch(err){
        return null;
    }
};

async function createOrder(body){
    try {
        return await this({
            _id: new mongoose.Types.ObjectId,
            ...body,
        });
    } catch(err){
        return err;
    };
};

async function updatedOrderId(id, body){
    try{
        return await this.findOneAndUpdate(
            {_id: id},
            body,
            {new: true},
        );
    } catch(err){
        return err;
    }
};

async function deleteOrderId(id){
    try{
        return await this.findByIdAndDelete(id);
    } catch(err) {
        return null;
    };
};

const ordersModel = mongoose.model('Order', orderSchema);
module.exports = ordersModel;