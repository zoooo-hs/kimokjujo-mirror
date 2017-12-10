var viewsAdatper = require('../adapters/views-adapter');
var dbResultCode = require('../status-codes/db-result');

viewsAdatper.increaseViews(167, function(resultCode){
    if(resultCode == dbResultCode.Fail){
        console.log('fail');
    }
    else{
        console.log('success');
    }
});