const pool = require('./mysql-pool');
const dbResultCode = require('../status-codes/db-result');

var adapter = {};

adapter.updateUserId = function(planMovieId, userId, cb){
    
    var p = [planMovieId,userId];
    //SET SQL_SAFE_UPDATES =0;
    var sql = "UPDATE resultmovie set contract = ? where planMovieId = ?;";

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err)
            var result = dbResultCode.Fail;
            conn.release();
            cb(result);
        }
        else {
            conn.query(sql, p, function (err, rows) {
                if (err) {
                    console.log(err)
                    conn.release();
                    result = dbResultCode.Fail;
                    cb(result);
                    }
                else {
                    console.log('complete contract');
                    conn.release();
                    result = dbResultCode.OK;
                    cb(result);
                }
            });
        }
    });

};

module.exports = adapter;
