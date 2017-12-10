const dbResultCode = require('../status-codes/db-result');
var pool = require('./mysql-pool');

var adapter = {};

adapter.write = function(resultMovie, cb) {

    var parameter = [resultMovie.planMovieId, resultMovie.date, resultMovie.scenario, resultMovie.audience, resultMovie.breakEvenPoint, resultMovie.contract, resultMovie.views];
    var sql = 'insert into resultmovie (planMovieId, date, scenario, audience, breakEvenPoint, contract, views) values(?,?,?,?,?,?,?) ';

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
                    sql = 'insert into likeit (user1Id, planMovieId) values(?, ?)';
                    parameter = ['empty', resultMovie.planMovieId];
                    conn.query(sql, parameter, function(err) {
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
    var sql = "select d.*, count(likeit.user1Id) - 1 as likeCount from (SELECT planmovie.*, group_concat(actorId) as actors, f.* FROM (select planMovieId, contract, views from resultmovie  WHERE scenario != '' and contract = '') f, planmovie, planmovieactor where f.planMovieId = planmovie.id and planmovieactor.planMovieId = f.planMovieId group by f.planMovieId) d, likeit where d.id = likeit.planMovieId or likeit.planMovieId = null group by d.id;";
     
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
