const dbResultCode = require('../status-codes/db-result');
const pool = require('./mysql-pool');

var adapter = {};

adapter.write = function(director, cb) {

    var resultCode = dbResultCode.Fail;
    var p = [director.id,director.name];
    var sql = "INSERT INTO director (id, name) VALUES (?,?)";

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

adapter.search = function(directorId, cols, cb) {

    var resultCode = dbResultCode.Fail;
    var p = [directorId];
    var sql = "SELECT * FROM director WHERE director.id=? ";

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
