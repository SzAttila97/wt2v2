const shutterService = require('../services/shutter.service');

class ShutterController {
    getAll(req, res) {
        shutterService.getAll(function (err, data) {
            if (err) {
                res.json({error: err});
                return;
            }

            res.json(data);
        });
    }
}

module.exports = new ShutterController();