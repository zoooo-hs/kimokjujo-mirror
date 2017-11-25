const pool = require('./mysql-pool');
const dbResultCode = require('../status-codes/db-result');

var adapter = {};

adapter.getList = function(actorPower , cb){
    var largeSql = 'SELECT * from monthlypower where monthlypower.power >= ? order by power desc limit 3';
    var smallSql = 'SELECT * from monthlypower where monthlypower.power < ? order by power limit 3';
    var parameter = [actorPower];
    var resultCode = dbResultCode.Fail;

    var result;

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode, []);
        }
        else {
            conn.query(largeSql, parameter, function (err, rows) {
                if (err) {
                    console.log(err);
                    resultCode = dbResultCode.Fail;
                    conn.release();
                    cb(resultCode, []);
                }
                else {
                    resultCode = dbResultCode.OK;
                    result= rows;
                    conn.query(smallSql,parameter, function(err, rows){
                        if(err){
                            console.log(err);
                            resultCode = dbResultCode.Fail;
                            conn.release();
                            cb(resultCode,[]);
                        }
                        else{
                            resultCode = dbResultCode.OK;
                            conn.release();
                            result.concat(rows);
                            cb(resultCode, result);
                        }
                    });
                }
            });
        }
    });


};

module.exports = adapter;