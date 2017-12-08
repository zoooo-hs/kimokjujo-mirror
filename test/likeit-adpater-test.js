var likeitAdapter = require('../adapters/like-it-adapter');
var dbResultCode = require('../status-codes/db-result');

likeitAdapter.write('heeeee123', 170, function(resultCode) {
    var resultCode;
    if (resultCode == dbResultCode.OK) {
        console.log('write success');
    }
    else {
        console.log('db error');
    }
});

