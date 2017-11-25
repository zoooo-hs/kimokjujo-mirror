const pool = require('./mysql-pool');
const dbResultCode = require('../status-codes/db-result');

var adapter = {};

adapter.search = function(actorId,cols, cb) {
    var parameter = [actorId];
    var sql = 'SELECT * from monthlypower where monthlypower.actorId = ? ORDER BY year desc limit 1';
    var resultCode = dbResultCode.Fail;
    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode,[]);
        } else {
            conn.query(sql, parameter, function(err,rows) {
                if (err) {
                    console.log(err);
                    resultCode = dbResultCode.Fail;
                    conn.release();
                    cb(resultCode,[]);
                } else {
                    resultCode = dbResultCode.OK;
                    conn.release();
                    cb(resultCode,rows);
                }
            });
        }
    });
};

module.exports = adapter;