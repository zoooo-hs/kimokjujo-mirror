const pool = require('./mysql-pool');
const dbResultCode = require('../status-codes/db-result');

var adapter = {};

adapter.write = function (userId, planMovieId, cb) {

    var query = 'insert into likeit (user1Id, planMovieId) values(?, ?)';
    var removeQuery = 'delete from likeit where user1Id=? and planMovieId =?';
    var parameter = [userId, planMovieId];
    var resultCode;

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode);
        }
        else {
            conn.query(query, parameter, function (err) {
                if (err) {
                    if (err.code == 'ER_DUP_ENTRY') {
                        conn.query(removeQuery, parameter, function (err) {
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
                    else {
                        resultCode = dbResultCode.Fail;
                        console.log(err);
                        conn.release();
                        cb(resultCode);
                    }
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

adapter.searchByuserId = function (userId, cb) {

    var query = 'select * from likeit where likeit.user1Id = ?';
    var parameter = [userId];
    var resultCode = dbResultCode.Fail;

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode, []);
        }
        else {
            conn.query(query, parameter, function (err, rows) {
                if (err) {
                    console.log(err);
                    conn.release();
                    resultCode = dbResultCode.Fail;
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

adapter.searchMine = function (userId, planMovieId, cb) {
    
        var query = 'select * from likeit where likeit.user1Id = ? and likeit.planMovieId = ?';
        var parameter = [userId, planMovieId];
        var resultCode = dbResultCode.Fail;
    
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                resultCode = dbResultCode.Fail;
                conn.release();
                cb(resultCode, []);
            }
            else {
                conn.query(query, parameter, function (err, rows) {
                    if (err) {
                        console.log(err);
                        conn.release();
                        resultCode = dbResultCode.Fail;
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

adapter.searchByplanMovieId = function (planMovieId, cb) {

    var query = 'select * from likeit where likeit.planMovieId = ?';
    var parameter = [planMovieId];
    var resultCode;

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode, []);
        }
        else {
            conn.query(query, parameter, function (err, rows) {
                if (err) {
                    console.log(err);
                    conn.release();
                    resultCode = dbResultCode.Fail;
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

adapter.countLike = function (planMovieId, cb) {

    var query = 'select count(*) as cnt from likeit where likeit.planMovieId = ?';
    var parameter = [planMovieId];
    var resultCode;

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode, []);
        }
        else {
            conn.query(query, parameter, function (err, rows) {
                if (err) {
                    console.log(err);
                    conn.release();
                    resultCode = dbResultCode.Fail;
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