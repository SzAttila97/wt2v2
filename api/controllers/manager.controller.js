const OrderService = require('../services/order.service');

class ManagerController {
    getOrdersByCustomer(req, res) {  //????JÓ????
        OrderService.getByCustomer(req.params.customerId, function (err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }

    getOrdersByWorker(req, res) {       //????JÓ????
        OrderService.getByWorker(req.params.workerId, function (err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }
    getOrders(req, res) {       //getAll??
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

    datedOrder(req, res) {
        OrderService.updateById(req.params.orderId, {status: 'dated'}, function(err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }

    pricedOrder(req, res) {
        OrderService.updateById(req.params.orderId, {status: 'priced'}, function(err, data) {
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
        OrderService.updateById(req.params.orderId, {price: '200'}, function(err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }
}



module.exports = new ManagerController();