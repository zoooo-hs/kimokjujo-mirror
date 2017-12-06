var makerAdapter = require('../adapters/makerdb-adapter');

makerAdapter.search('producer_1030', [], function(resultCode, rows) {
    if(rows.length>0) {
        for (i in rows) {
            console.log(rows[i].name);
        }
    }
    else{
        console.log('fail');
    }
});