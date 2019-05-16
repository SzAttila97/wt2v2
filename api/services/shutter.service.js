const dao = require('../daos/shutter.dao');

class ShutterService {
    getAll(cb) {
        dao.getAll(function(err, data) {
           if(err) {
               console.log(err);
               cb('Failed to get shutters from database', null);
               return;
           }

           cb(null, data);
        });
    }

    save(shutter, cb) {
        if(!shutter.width) {
            cb('Shutter must have width', null);
            return;
        }

        if(!shutter.height) {
            cb('Shutter must have height', null);
            return;
        }

        dao.save(shutter, function(err, data) {
            if(err) {
                console.log(err);
                cb('Failed to save shutters to database', null);
                return;
            }

            cb(null, data);
        });
    }
}

module.exports = new ShutterService();