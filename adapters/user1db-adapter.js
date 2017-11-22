const User1 = require('../models/user1');
const user1Data = require('../mockup/user1-mockup');

var adapter = {};

var result_code = {
    "OK": 1,
    "Fail": 2
}

adapter.write = function(user1, cb) {

    // 들어온 유저1에 대한 디비 저장 후 컬백 함수 실행

    var result = result_code.OK;
    
    cb(result);
}

adapter.search = function(user1Id, cols, cb) {

    // search

    var rows = [];

    for (i in user1Data) {
        if (user1Id == user1Data[i].id) {
            rows.push(user1Data[i]);
            break;
        }
    }


    var result = result_code.OK;

    cb(result, rows);
}


module.exports = adapter;