var resultMovieAdapter = require('../adapters/result-moviedb-adapter');
const dbResultCode = require('../status-codes/db-result');

resultMovieAdapter.searchFundList(function(resultCode,rows){
    if(resultCode==dbResultCode.OK){
        for(var i in rows){
            console.log("result:"+JSON.stringify(rows[i]));
        }
    }
    else{
        console.log('query fail');
        }
});