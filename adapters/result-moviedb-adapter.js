const dbResultCode = require('../status-codes/db-result');
var pool = require('./mysql-pool');

var adapter = {};

adapter.write = function(resultMovie, cb) {

    var parameter = [resultMovie.planMovieId, resultMovie.date, resultMovie.scenario, resultMovie.audience, resultMovie.breakEvenPoint, resultMovie.contract];
    var sql = 'insert into resultmovie (planMovieId, date, scenario, audience, breakEvenPoint, contract) values(?,?,?,?,?,?) ';

    var resultCode = dbResultCode.Fail;

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode);
        } else {
            conn.query(sql, parameter, function(err) {
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

adapter.searchByPlanMovieId = function(planMovieId, cols, cb) {

    var resultCode = dbResultCode.Fail;
    var p = [planMovieId];
    var sql = "SELECT * FROM resultmovie WHERE resultmovie.planMovieId=? ";

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err);
            console.log("first");
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode, []);
        }
        else {
            conn.query(sql, p , function(err, rows) {
                if (err) {
                    console.log(err);
                    console.log("second");
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

adapter.searchFundList = function(cb) {

    var resultCode = dbResultCode.Fail;
    var sql = "SELECT * FROM (select planMovie from resultmovie  WHERE scenario != '' and contract = '') f, planmovie where f.planMovieId = planmovie.id";

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode, []);
        }
        else {
            conn.query(sql,  function(err, rows) {
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