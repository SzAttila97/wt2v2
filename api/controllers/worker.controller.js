const OrderService = require('../services/order.service');

class WorkerController {
    getAvailableOrders(req, res) {  // Összes vállalható order listázása!
        OrderService.getByStatus('accepted', function (err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }
    getTakenOrders(req, res) {  // Összes vállalt order listázása!
        OrderService.getByWorker(req.params.workerId, function (err, data) {
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