const dbResultCode = require('../status-codes/db-result');

var pool = require('./mysql-pool');

var uniquid = require('uniquid')

var adapter = {};

adapter.write = function(engineMovie, cb) {

    var parameter = [uniquid('movie_'), engineMovie.title, engineMovie.original, engineMovie.originalVisible, engineMovie.budget, engineMovie._3words, engineMovie.breakEvenPoint, engineMovie.date, engineMovie.genre, engineMovie.contentRate, engineMovie.audience, engineMovie.directorId, engineMovie.makerId];
    var writeQuery = 'insert into enginemoviedata (id, title, original, originalVisible, budget, _3words, breakEvenPoint, date, genre, contentRate, audience, directorId, makerId) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

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

adapter.search = function(engineMovieId, cb) {
    var parameter = [engineMovieId];
    var searchQuery = 'SELECT * from enginemoviedata where enginemoviedata.id = ?';
    var resultCode = dbResultCode.Fail;
    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode,[]);
        } else {
            conn.query(searchQuery, parameter, function(err,rows) {
                if (err) {
                    console.log(err);
                    resultCode = dbResultCode.Fail;
                    conn.release();
                    cb(resultCode,[]);
                } else {
                    resultCode = dbResultCode.OK;
                    conn.release();
                    cb(resultCode,rows);
                }
            });
        }
    });
};



module.exports = adapter;
