const User2 = require('../models/user2.js');
const User2data = require('../mockup/user2-mockup');
const pool = require('./mysql-pool');
const dbResultCode = require('../status-codes/db-result'); 

var adapter = {};

adapter.write = function(user2, cb){
    var p = [user2.id,user2.password,user2.address,user2.contact,user2.financialInfo,user2.name];
    var sql = "INSERT INTO user2 (id, password,address,contact,financialInfo,name) VALUES (?,?,?,?,?,?)";

    pool.getConnection(function(err, connection) {
        if (err) {
            console.log(err)
            result = dbResultCode.Fail;
            cb(result);
        }
        else {
            connection.query(sql, p, function (err, rows) {
                if (!err) {
                    console.log('user2 insert');
                    //res.redirect('http://localhost:5001/exercise/list');
                    result = dbResultCode.OK;
                }
                else {
                    console.log(err)
                    result = dbResultCode.Fail;
                }
                cb(result); 
                connection.release();
            });
        }
    });

};

adapter.search = function(user2Id,cols,cb){
    //search 하는 거~~~~
    var s = "SELECT * FROM user2 WHERE user2.id=? ";
    var parameter = [user2Id];

    pool.getConnection(function(err, connection) {
        if (err) { 
            console.log(err)
            result = dbResultCode.Fail;
            connection.release();
            cb(result, []);
        }
        else {
            connection.query(s, parameter, function (err, rows) {
                if (!err) {
                    result = dbResultCode.OK;
                    connection.release();
                    cb(result, rows);
                }
                else {
                    console.log(err)
                    result = dbResultCode.Fail;
                    connection.release();
                    cb(result, []);
                }
            });
        }
    });
}

module.exports = adapter;
