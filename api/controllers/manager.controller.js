const OrderService = require('../services/order.service');

class ManagerController {
    getOrders(req, res) {
        OrderService.getAll(function (err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }

    okOrder(req, res) {
        OrderService.updateById(req.params.orderId, {status: 'ok'}, function(err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }


    paidOrder(req, res) {
        OrderService.updateById(req.params.orderId, {status: 'paid'}, function(err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }

    closedOrder(req, res) {
        OrderService.updateById(req.params.orderId, {status: 'closed'}, function(err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }

    priceOrder(req, res) {
        OrderService.updateById(req.params.orderId, {price: req.params.price, status:'priced'}, function(err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }

    dateOrder(req, res) {
        OrderService.updateById(req.params.orderId, {installationDate: req.params.installationDate, status:'dated'}, function(err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }
}



module.exports = new ManagerController();