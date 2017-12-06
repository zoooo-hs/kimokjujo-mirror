const dbResultCode = require('../status-codes/db-result');
const pool = require('./mysql-pool');

var adapter = {};

adapter.write = function(maker, cb) {

    var resultCode = dbResultCode.Fail;
    var p = [maker.id,maker.name];
    var sql = "INSERT INTO maker (id, name) VALUES (?,?)";

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode);
        }
        else {
            conn.query(sql, p, function(err) {
                if (err) {
                    console.log(err);
                    resultCode = dbResultCode.Fail;
                    conn.release();
                    cb(resultCode);
                }
                else {
                    resultCode = dbResultCode.OK;
                    conn.release();
                    cb(resultCode);
                }
            });
        }
    });
};

adapter.search = function(makerId, cols, cb) {

    var resultCode = dbResultCode.Fail;
    var p = [makerId];
    var sql = "SELECT * FROM maker WHERE maker.id=? ";

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode, []);
        }
        else {
            conn.query(sql, p , function(err, rows) {
                if (err) {
                    console.log(err);
                    resultCode = dbResultCode.Fail;
                    conn.release();
                    cb(resultCode, []);
                }
                else {
                    resultCode = dbResultCode.OK;
                    conn.release();
                    cb(resultCode, rows);
                }
            });
        }
    });
};


module.exports = adapter;
