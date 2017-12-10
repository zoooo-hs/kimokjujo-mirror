const pool = require('./mysql-pool');
const dbResultCode = require('../status-codes/db-result');

var adapter = {};

adapter.increaseViews = function (planMovieId, cb) {

    var resultCode;

    var parameter = [planMovieId];
    var sql = 'update resultmovie set views = views +1 where planMovieId = ?';

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            conn.release();
            resultCode = dbResultCode.Fail;
            cb(resultCode);
        }
        else {
            conn.query(sql, parameter, function (err) {
                if (err) {
                    console.log(err);
                    conn.release();
                    resultCode = dbResultCode.Fail;
                    cb(resultCode);
                }
                else {
                    conn.release();
                    resultCode = dbResultCode.OK;
                    cb(resultCode);
                }
            });
        }
    });

}

module.exports = adapter;