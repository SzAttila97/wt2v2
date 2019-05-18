const OrderService = require('../services/order.service');

class WorkerController {

    getOrders(req, res) {
        OrderService.getAll(function (err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }

    takeOrder(req, res) {
        OrderService.updateById(req.params.orderId, {status: 'taken'}, function(err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }

    doneOrder(req, res) {
        OrderService.updateById(req.params.orderId, {status: 'done'}, function(err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }
}

module.exports = new WorkerController();