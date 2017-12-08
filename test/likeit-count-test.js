var likeitAdapter = require('../adapters/like-it-adapter');
var dbResultCode = require('../status-codes/db-result');

likeitAdapter.countLike(0,function(resultCode, rows){
    if(rows.length==0){
        console.log('err');   
    }
    else{
        console.log(JSON.stringify(rows));
    }
});