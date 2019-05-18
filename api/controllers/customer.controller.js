const OrderService = require('../services/order.service');

class CustomerController {
    getOrders(req, res) {
        OrderService.getByCustomer(req.params.customerId, function (err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }

    acceptOrder(req, res) {
        OrderService.updateById(req.params.orderId, {status: 'accepted'}, function(err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }

    /*declineOrder(req, res) {
        OrderService.updateById(req.params.orderId, {status: 'deleted'}, function(err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }*/

    declineOrder(req, res) {
        OrderService.updateById(req.params.orderId, {status: 'declined'}, function(err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }
}

module.exports = new CustomerController();