const Shutter = require('../database/models/shutter');

class ShutterDao {
    getAll(cb) {
        Shutter.find({}, function (err, shutters) {
            cb(err, shutters);
        });
    }

    save(shutter, cb) {
        const sh = new Shutter({
            width: shutter.width,
            height: shutter.height
        });
        sh.save().then(function(data, err) {
            if(err) {
                cb(err, null);
                return;
            }

            cb(null, data);
        });
    }
}


module.exports = new ShutterDao();