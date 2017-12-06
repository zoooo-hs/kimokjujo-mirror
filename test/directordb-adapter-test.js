var directorAdapter = require('../adapters/directordb-adapter');

directorAdapter.search('director_1000', [], function(resultCode, rows) {
    if(rows.length>0) {
        for (i in rows) {
            console.log(rows[i].name);
        }
    }
    else{
        console.log('fail');
    }
});