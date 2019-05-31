const OrderDao = require('../daos/order.dao');
const ShutterService = require('../services/shutter.service');

class OrderService {
    create(object, cb) {
        if (object.customerId === undefined) {
            cb('Customer is missing', null);
            return;
        }

        if (object.isNet === undefined) {
            cb('Order must specifiy net', null);
            return;
        }

        if (object.color === undefined) {
            cb('Order must specifiy color', null);
            return;
        }

        if (object.material === undefined) {
            cb('Order must specifiy material', null);
            return;
        }

        ShutterService.save(object, function (err, shutter) {
            if (err) {
                cb(err, null);
                return;
            }

            OrderDao.create(object, shutter, function (err2, data) {
                if (err2) {
                    cb(err2, null);
                    return;
                }

                cb(null, data);
            });
        });
    }

    getAll(cb) {
        OrderDao.getAll(function (err, data) {
            if (err) {
                cb('Failed to get all orders', null);
                return;
            }

            cb(null, data);
        });
    }

    getByCustomer(userId, cb) {
        OrderDao.getByCustomer(userId, function (err, data) {
            if (err) {
                cb('Failed to get orders for customer' + userId, null);
                return;
            }

            cb(null, data);
        });
    }


    updateById(orderId, params, cb) {
        OrderDao.updateById(orderId, params, function (err, data) {
            if (err) {
                console.log(err);
                cb('Failed to update order with id ' + orderId, null);
                return;
            }

            cb(null, data);
        });
    }

}

module.exports = new OrderService();