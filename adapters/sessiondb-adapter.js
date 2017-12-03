const dbResultCode = require('../status-codes/db-result');
var pool = require('./mysql-pool');

var adapter = {};

adapter.typeCheck = function(sessionKey,cb){

    var resultCode;
    var query = 'SELECT * FROM session where session.sessionKey = ?';
    var parameter = [sessionKey];

    pool.getConnection(function (err,conn) {
        if(err){
            resultCode = dbResultCode.Fail;
            console.log(err);
            conn.release();
            cb(-1);
        }
        else{
            conn.query(query,parameter,function (err,rows) {
                if(err){
                    resultCode = dbResultCode.Fail;
                    console.log(err);
                    conn.release();
                    cb(-1);
                }
                else{
                    resultCode = dbResultCode.OK;
                    conn.release();
                    if (rows.length>0){
                        var userType = rows[0].userType;
                        cb(userType);
                    } else{
                        cb(-1);
                    }
                }
            });
        }
    });
};

adapter.write = function (session, cb) {

    var resultCode;
    var query = 'insert into session (sessionKey, userType, userId) values (?, ?, ?)';
    var parameter = [session.sessionKey, session.userType, session.userId];

    pool.getConnection(function (err, conn) {
        if (err) {
            resultCode = dbResultCode.Fail;
            console.log(err);
            conn.release();
            cb(resultCode);
        }
        else {
            conn.query(query, parameter, function (err, rows) {
               if (err) {
                   resultCode = dbResultCode.Fail;
                   console.log(err);
                   conn.release();
                   cb(resultCode);
               }
               else{
                   resultCode = dbResultCode.OK;
                   conn.release();
                   cb(resultCode);
               }
            });
        }
    });
};

adapter.search = function(sessionKey, cols, cb) {
    var resultCode;
    var query = 'SELECT * FROM session where session.sessionKey = ?';
    var parameter = [sessionKey];

    pool.getConnection(function (err,conn) {
      if(err){
          resultCode = dbResultCode.Fail;
          console.log(err);
          conn.release();
          cb(resultCode, []);
      }
      else{
          conn.query(query,parameter,function (err,rows) {
              if(err){
                  resultCode = dbResultCode.Fail;
                  console.log(err);
                  conn.release();
                  cb(resultCode, []);
              }
              else{
                  resultCode = dbResultCode.OK;
                  conn.release();
                  cb(resultCode, rows);
              }
          });
      }
  });
};

adapter.delete = function(sessionKey, cb) {
    var resultCode;
    var query = 'delete FROM session where session.sessionKey = ?';
    var parameter = [sessionKey];

    pool.getConnection(function (err,conn) {
      if(err){
          resultCode = dbResultCode.Fail;
          console.log(err);
          conn.release();
          cb(resultCode, []);
      }
      else{
          conn.query(query,parameter,function (err) {
              if(err){
                  resultCode = dbResultCode.Fail;
                  console.log(err);
                  conn.release();
                  cb(resultCode);
              }
              else{
                  resultCode = dbResultCode.OK;
                  conn.release();
                  cb(resultCode);
              }
          });
      }
  }); 
}; 

module.exports = adapter;