const pool = require('./mysql-pool');
const dbResultCode = require('../status-codes/db-result');

var adapter = {};

adapter.searchActorPowerTrend = function(actorId, cb) {

    var query = 'select date, audience from kimokjujo_service.enginemoviedata e, (SELECT engineMOvieId FROM kimokjujo_service.enginemovieactor where actorId = ?) p where e.id = p.engineMovieId order by date;';
    var p = [actorId];
    var resultCode;

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err);
            conn.release();
            resultCode = dbResultCode.Fail;
            cb(resultCode, []);
        }
        else {
            conn.query(query, p, function(err, rows) {
                if (err) {
                    console.log(err);
                    conn.release();
                    resultCode = dbResultCode.Fail;
                    cb(resultCode, []); 
                }
                else {
                    conn.release();
                    resultCode = dbResultCode.OK;
                    cb(resultCode, rows);
                }
            });
        }
    });
};

module.exports = adapter;