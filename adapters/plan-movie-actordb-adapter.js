const dbResultCode = require('../status-codes/db-result');

var pool = require('../adapters/mysql-pool');

var adapter = {}

adapter.searchByPlanMovieId = function (planMovieId, cols, cb) {

    var resultCode;

    var query = 'select * from planmovieactor pma where pma.planMovieId = ?';
    var parameter = [planMovieId];

    pool.getConnection(function(err, conn) {
        if (err) {
            resultCode = dbResultCode.Fail;
            console.log(err)
            conn.release();
            cb(resultCode, []);
        }
        else {
            conn.query(query, parameter, function(err, rows) {
                if (err) {
                    resultCode = dbResultCode.Fail;
                    console.log(err)
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

adapter.write = function (planMovie, cb) {
    
    var resultCode;

    var query = 'insert into planmovieactor (planMovieId, actorId) values (?, ?)';
    var parameter = [planMovie.planMovieId, planMovie.actorId];

    pool.getConnection(function (err, conn) {
        if (err) {
            resultCode = dbResultCode.Fail;
            console.log(err)
            conn.release();
            cb(resultCode);
        }
        else {
            conn.query(query, parameter, function(err) {
                if (err) {
                    resultCode = dbResultCode.Fail;
                    console.log(err)
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
}

module.exports = adapter;