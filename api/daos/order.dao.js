const Order = require('../database/models/order');
const mongoose = require('mongoose');

class OrderDao {
    getByCustomer(userId, cb) {
        Order.find({customerId: userId}).populate('shutter').exec(cb);
    }

    getByWorker(workerId, cb) {
        Order.find({workerId: workerId}).populate('shutter').exec(cb);
    }

    getAll(cb) {
        Order.find({}).populate('shutter').exec(cb);
    }

    getByStatus(status, cb) {
        Order.find({status: status}).populate('shutter').exec(cb);
    }

    create(order, shutter, cb) {
        const o = new Order({
            shutter: shutter,
            shutterColor: order.color,
            shutterMaterial: order.material,
            shutterNet: order.isNet === '1',
            customerId: order.customerId
        });
        o.save(cb);
    }

    updateById(id, params, cb) {
        Order.update({_id: mongoose.Types.ObjectId(id)}, {$set: params}, function (err, data) {
            if (err) {
                cb(err, null);
                return;
            }
            cb(null, data)
        });
    }

}

module.exports = new OrderDao();