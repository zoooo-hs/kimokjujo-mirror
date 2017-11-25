const dbResultCode = require('../status-codes/db-result');

var pool = require('./mysql-pool');

var adapter = {};

adapter.searchByMovieId = function (engineMovieId, cols, cb) {

    var resultCode;

    var query = 'select * from enginemovieactor where enginemovieactor.engineMovieId = ?';
    var parameter = [engineMovieId];

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

adapter.write = function (engineMovieActor, cb) {

    var resultCode;

    var query = 'insert into enginemovieactor (engineMovieId, actorId) values (?, ?)';
    var parameter = [engineMovieActor.engineMovieId, engineMovieActor.actorId];

    pool.getConnection(function (err, conn) {
        if (err) {
            resultCode = dbResultCode.Fail;
            console.log(err);
            conn.release();
            cb(resultCode);
        }
        else {
            conn.query(query, parameter, function(err) {
                if (err) {
                    resultCode = dbResultCode.Fail;
                    console.log(err);
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


module.exports = adapter;
