const dbResultCode = require('../status-codes/db-result');
var pool = require('../adapters/mysql-pool');

var adapter = {}

adpater.searchByPlanMovieId = function (planMovieId, cols, cb) {

    var resultCode;

    var query = 'select * from planmovieuser where planmovieuser.planMovieId = ?';
    var parameter = [planMovieId];

    pool.getConnection(function(err, conn) {
        if (err) {
            resultCode = dbResultCode.Fail;
            console.log(err);
            conn.release();
            cb(resultCode, []);
        }
        else {
            conn.query(query, parameter, function(err, rows) {
                if (err) {
                    resultCode = dbResultCode.Fail;
                    console.log(err);
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
}

adapter.searchByUserId = function (userId, cols, cb) {

    var resultCode;

    var query = 'select * from planmovieuser where planmovieuser.userId = ?';
    var parameter = [userId];

    pool.getConnection(function(err, conn) {
        if (err) {
            resultCode = dbResultCode.Fail;
            console.log(err);
            conn.release();
            cb(resultCode, []);
        }
        else {
            conn.query(query, parameter, function(err, rows) {
                if (err) {
                    resultCode = dbResultCode.Fail;
                    console.log(err);
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

adapter.write = function (planMovieUser, cb) {

    var resultCode;

    var query = 'insert into planmovieuser (planMovieId, userId) values (?, ?)';
    var parameter = [planMovieUser.planMovieId, planMovieUser.userId];

    pool.getConnection(function (err, conn) {
        if (err) {
            resultCode = dbResultCode.Fail;
            console.log(err);
            conn.release();
            cb(resultCode);
        }
        else {
            conn.query(query, parameter, function(err, ret) {
                if (err) {
                    resultCode = dbResultCode.Fail;
                    console.log(err);
                    conn.release();
                    cb(resultCode);
                }
                else {
                    resultCode = dbResultCode.OK;
                    conn.release();
                    cb(resultCode, ret);
                }
            });
        }
    });
};

module.exports = adapter;