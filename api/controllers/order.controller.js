const OrderService = require('../services/order.service');

class OrderController {
    getAll(req, res) {
        OrderService.getAll(function (err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }

    getByStatus(req, res) {
        OrderService.getByStatus(req.params.status, function (err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }


    create(req, res) {
        OrderService.create(req.body, function (err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json({success: true});
        });
    }


}

module.exports = new OrderController();