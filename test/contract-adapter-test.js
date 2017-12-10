var contractAdapter = require('../adapters/contract-adapter');
var dbresultCode = require('../status-codes/db-result');

contractAdapter.updateUserId(168,'dogfooter',function(resultCode){
    if(resultCode == dbresultCode.Fail){
        console.log('update fail');
    }
    else{
        console.log('update success');
    }
});
