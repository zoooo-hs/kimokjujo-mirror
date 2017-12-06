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

adapter.write = function (planMovieActor, cb) {
    
    var resultCode;

    var query = 'insert into planmovieactor (planMovieId, actorId) values (?, ?)';
    var parameter = [planMovieActor.planMovieId, planMovieActor.actorId];

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
};

adapter.writeActors = function(planMovieActors, cb) { 

    var resultCode;

    var query = 'insert into planmovieactor (planMovieId, actorId) values (?, ?)';
    var parameter = [];

    pool.getConnection(function (err, conn) {
        if (err) {
            resultCode = dbResultCode.Fail;
            console.log(err)
            conn.release();
            cb(resultCode);
        }
        else {
            parameter = [planMovieActors[0].planMovieId, planMovieActors[0].actorId];
            conn.query(query, parameter, function(err) {
                if (err) {
                    resultCode = dbResultCode.Fail;
                    console.log(err)
                    conn.release();
                    cb(resultCode);
                }
                else { 
                    if (planMovieActors.length == 1) {
                        resultCode = dbResultCode.OK;
                        conn.release();
                        cb(resultCode); 
                    }
                    else {
                        parameter = [planMovieActors[1].planMovieId, planMovieActors[1].actorId];
                        conn.query(query, parameter, function (err) {
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
                } 
            });
        }
    });
};

module.exports = adapter;