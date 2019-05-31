const OrderService = require('../services/order.service');

class OrderController {

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