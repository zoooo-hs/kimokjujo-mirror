const dbResultCode = require('../status-codes/db-result');
var pool = require('./mysql-pool');

var adapter = {};

adapter.write = function(planMovie, cb) {

    var parameter = [planMovie.title, planMovie.original, planMovie.originalVisible, planMovie.budget, planMovie._3words, planMovie.breakEvenPoint,planMovie.releaseMonth,planMovie.genre,planMovie.contentRate,planMovie.directorId,planMovie.makerId];
    var writeQuery = 'insert into planmovie (title, original, originalVisible, budget, _3words, breakEvenPoint,releaseMonth,genre,contentRate,directorId,makerId) values(?,?,?,?,?,?,?,?,?,?,?);';

    var resultCode = dbResultCode.Fail;

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode);
        } else {
            conn.query(writeQuery, parameter, function(err) {
                if (err) {
                    console.log(err);
                    resultCode = dbResultCode.Fail;
                    conn.release();
                    cb(resultCode);
                } else {
                    resultCode = dbResultCode.OK;
                    conn.release();
                    cb(resultCode);
                }
            });
        }
    });
};

module.exports = adapter;