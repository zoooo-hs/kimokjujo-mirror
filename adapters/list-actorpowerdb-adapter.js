const pool = require('./mysql-pool');
const dbResultCode = require('../status-codes/db-result');

var adapter = {};

adapter.getList = function(actorIds , cb){
    var query = '(select mp.power, mp.actorId from monthlypower mp, (SELECT * from monthlypower where monthlypower.actorId = ?) ap where ap.power > mp.power order by mp.power desc limit 3) union (select mp.power, mp.actorId from monthlypower mp, (SELECT * from monthlypower where monthlypower.actorId = ?) ap where ap.power < mp.power order by mp.power limit 3) order by power desc;' 
    var parameter = [];

    var resultCode = dbResultCode.Fail; 
    var result = {}; 

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(err);
            resultCode = dbResultCode.Fail;
            conn.release();
            cb(resultCode, {});
        }
        else {
            parameter = [actorIds[0], actorIds[0]]
            conn.query(query, parameter, function (err, rows) {
                if (err) {
                    console.log(err);
                    resultCode = dbResultCode.Fail;
                    conn.release();
                    cb(resultCode, {});
                }
                else {
                    parameter = [actorIds[1], actorIds[1]]
                    resultCode = dbResultCode.OK;
                    result.actor1 = rows;
                    conn.query(query, parameter, function(err, rows){
                        if(err){
                            console.log(err);
                            resultCode = dbResultCode.Fail;
                            conn.release();
                            cb(resultCode, {});
                        }
                        else{
                            resultCode = dbResultCode.OK;
                            conn.release();
                            result.actor2 = rows;
                            cb(resultCode, result);
                        }
                    });
                }
            });
        }
    }); 
};

module.exports = adapter;