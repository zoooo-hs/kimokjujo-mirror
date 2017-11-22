const User2 = require('../models/user2.js');
const User2data = require('../mockup/user2-mockup');

var adapter = {};
var result_code ={
    "OK":1,
    "Fail":2
}

adapter.write = function(user2, cb){
    //CREATE user2에 대한 instance생성 -> callback
    var result = result_code.OK;
    cb(result);
}

adapter.search = function(user2Id,cols,cb){
    //search 하는 거~~~~
    var rows = [];
    for(i in User2data){
        if(user2Id == User2data[i].id){
            rows.push(User2data[i]);
        }
    }
    var result = result_code.OK;

    cb(result,rows);
}

module.exports = adapter;
