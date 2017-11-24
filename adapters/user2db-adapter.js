const User2 = require('../models/user2.js');
const User2data = require('../mockup/user2-mockup');
const pool = require('./mysql-pool');

var adapter = {};
var resultCode ={
    "OK":1,
    "Fail":2
}
var result;
adapter.write = function(user2, cb){
    var p = [user2.id,user2.password,user2.address,user2.contact,user2.financialInfo,user2.name];
    var sql = "INSERT INTO user2 (id, password,address,contact,financialInfo,name) VALUES (?,?,?,?,?,?)";

    pool.getConnection(function(err, connection) {
        connection.query(sql,p,function(err, rows) {
            if(!err){
                console.log('user2 insert');
                //res.redirect('http://localhost:5001/exercise/list');
                result = resultCode.OK;
            }
            else{
                console.log('id is not unique.');
                result = resultCode.Fail;
            }
            cb(result);

            connection.release();
        });
    });

};

adapter.search = function(user2Id,cols,cb){
    //search 하는 거~~~~
    var s = "SELECT * FROM user2 WHERE user2.id=? ";
    var parameter = [user2Id];

    pool.getConnection(function(err, connection) {
        connection.query(s,parameter,function(err, rows) {
                if(!err){
                    if(rows.length==1){
                        result = resultCode.OK;
                        console.log('result:'+result);;
                    }
                }
                else{
                    console.log('Error while performing Query:', err)
                    console.log('result:'+result);;
                    result = resultCode.Fail;
                }
            cb(result,rows);
            connection.release();
        });
    });
}

module.exports = adapter;
