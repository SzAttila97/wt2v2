const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shutter: {type: mongoose.Schema.Types.ObjectId, ref: 'shutter', aggregate: true},
    status: {
        type: String,
        require: true,
        default: 'pending'
    },
    shutterColor: {
        type: String,
        require: true
    },
    shutterMaterial: {
        type: String,
        require: true
    },
    shutterNet: {
        type: Boolean,
        require: true
    },
    installationDate: {
        type: String,
        require: false,
        default: null
    },
    price:{
        type: String,
        require: false,
        default: null
    },
    customerId:{
        type: String,
        require: true,
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;