const pool = require('./mysql-pool');
const dbResultCode = require('../status-codes/db-result');

var adapter = {};

adapter.write = function(actor, cb){
    var p = [actor.id,actor.name];
    var sql = "INSERT INTO actor (id, name) VALUES (?,?)";

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
                    console.log('actor insert');
                    conn.release();
                    result = dbResultCode.OK;
                    cb(result);
                }
            });
        }
    });

};

adapter.search = function(actorId,cols,cb){

    var sql = "SELECT * FROM actor WHERE actor.id=? ";
    var p = [actorId];

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err)
            var result = dbResultCode.Fail;
            conn.release();
            cb(result, []);
        }
        else {
            conn.query(sql, p, function (err, rows) {
                if (err) {
                    console.log(err)
                    result = dbResultCode.Fail;
                    conn.release();
                    cb(result, []);
                    }
                else {
                    result = dbResultCode.OK;
                    conn.release();
                    cb(result, rows);
                }
            });
        }
    });
}

module.exports = adapter;
