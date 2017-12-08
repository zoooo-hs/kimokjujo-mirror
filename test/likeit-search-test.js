var likeitAdapter = require('../adapters/like-it-adapter');
var dbResultCode = require('../status-codes/db-result');

likeitAdapter.searchByuserId('heeeee123',function(resultCode, rows){
    if(rows.length==0){
        console.log('err');   
    }
    else{
        console.log('selected:heeeee123'+JSON.stringify(rows));
    }
});