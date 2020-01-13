const mongoose = require('mongoose');
const timestamp = require('../helpers/timestamp');

const { Schema } = mongoose;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    tel: { type: Number, require: true},
    favoriteProducts: Array,
    viewedProducts: Array, 
    orders: Array,
},
{ 
    versionKey: false   // set to false then it wont create in mongodb
});

userSchema.plugin(timestamp);

userSchema.statics.createUser = createUser;
userSchema.statics.sendUsers = sendUsers;
userSchema.statics.sendUserId = sendUserId;
userSchema.statics.deleteUserId = deleteUserId;
userSchema.statics.updateUserId = updateUserId;

async function sendUsers(req) {
    const email = req.query.email;   
    if (email) {
        return await this.findOne({email});
    } else {
        return this.find();
    };
};

async function sendUserId(req) {
    const id = req.params.id;
    try {
        return await this.findById(id);
    } catch (err) {
        return null;
    };
};

async function createUser(req) {
    const { name, email, tel } = req.body;

    return this({
        _id: new mongoose.Types.ObjectId,
        name,
        email,
        tel,
    });
};

async function deleteUserId(id) {
    try{
       return await this.findByIdAndDelete(id);
    } catch(err) {
        return null;
    };
};

async function updateUserId(id, bodyUser) {
    try{
        return await this.findOneAndUpdate(
                { _id: id},
                bodyUser,
                {new: true}
            );
    } catch(err) {
        return null;
    };
};

const UsersModel = mongoose.model('User', userSchema);
 
module.exports = UsersModel;