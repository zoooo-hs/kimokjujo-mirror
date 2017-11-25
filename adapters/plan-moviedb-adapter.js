const dbResultCode = require('../status-codes/db-result');
var pool = require('./mysql-pool');

var adapter = {};

adapter.write = function(planMovie, cb) {

    var parameter = [planMovie.title, planMovie.original, planMovie.originalVisible, planMovie.budget, planMovie._3words, planMovie.releaseMonth, planMovie.genre, planMovie.contentRate, planMovie.directorId, planMovie.makerId];
    var writeQuery = 'insert into planmovie (title, original, originalVisible, budget, _3words, releaseMonth, genre, contentRate, directorId, makerId) values(?,?,?,?,?,?,?,?,?,?);';

    var resultCode = dbResultCode.Fail;

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode);
        } else {
            conn.query(writeQuery, parameter, function(err, result) {
                if (err) {
                    console.log(err);
                    resultCode = dbResultCode.Fail;
                    conn.release();
                    cb(resultCode);
                } else {
                    resultCode = dbResultCode.OK;
                    conn.release();
                    cb(resultCode, result.insertId);
                }
            });
        }
    });
};

adapter.search = function(planMovieId, cols, cb) {

    var resultCode = dbResultCode.Fail;
    var p = [planMovieId];
    var sql = "SELECT * FROM planmovie WHERE planmovie.id=? ";

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