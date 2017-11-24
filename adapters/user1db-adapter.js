const User1 = require('../models/user1');
const user1Data = require('../mockup/user1-mockup');

var pool = require('./mysql-pool');

var adapter = {};

adapter.resultCode = {
    "OK": 1,
    "Fail": 2
}
resultCode = {
    "OK": 1,
    "Fail": 2 
}

var writeQuery = 'insert into user1 (id, password, address, contact, financialInfo, companyName, companyLicense) values(?,?,?,?,?,?,?);';
var searchQuery = 'select * from user1 where id=?;'

adapter.write = function(user1, cb) {

    // 들어온 유저1에 대한 디비 저장 후 컬백 함수 실행

    var resultCode = this.resultCode.Fail;

    pool.getConnection(function(err, conn) {
        if (err) {
            resultCode = this.resultCode.Fail;
            conn.release();
            cb(resultCode);
        } else {
            conn.query(writeQuery, [user1.id, user1,password, user1.address, user1.contact, user1.financialInfo, user1.companyName, user1.compnayLicense], function(err) {
                if (err) {
                    resultCode = this.resultCode.Fail;
                    conn.release();
                    cb(resultCode); 
                } else { 
                    resultCode = this.resultCode.OK;
                    conn.release();
                    cb(resultCode)
                }
            });
        }
    });
}

adapter.search = function(user1Id, cols, cb) {

    // search
    var resultCode = this.resultCode.Fail;

    pool.getConnection(function(err, conn) {
        if (err) {
            resultCode = resultCode.Fail;
            conn.release();
            cb(resultCode, [])
        } else {
            conn.query(searchQuery, [user1Id], function(err, rows) {
                if (err) {
                    resultCode = resultCode.Fail;
                    conn.release();
                    cb(resultCode, [])
                } else {
                    resultCode = resultCode.OK;
                    conn.release();
                    cb(resultCode, rows);
                } 
            });
        }
    });
}


module.exports = adapter;