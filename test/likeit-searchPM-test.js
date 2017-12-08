var likeitAdapter = require('../adapters/like-it-adapter');
var dbResultCode = require('../status-codes/db-result');

likeitAdapter.searchByplanMovieId(170,function(resultCode, rows){
    if(rows.length==0){
        console.log('err');   
    }
    else{
        console.log('selected:170'+JSON.stringify(rows));
    }
});