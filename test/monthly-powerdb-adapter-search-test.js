var adapter = require('../adapters/monthly-powerdb-adapter');
var dbResultCode = require('../status-codes/db-result');

adapter.search('actor_1',[],function(resultCode,rows){
    if(resultCode == dbResultCode.OK){
        for(var i in rows){
            console.log('result:'+JSON.stringify(rows[i]));
        }
    }
    else{
        console.log('db query fail');
    }
});

