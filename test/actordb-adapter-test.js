var actorAdapter = require('../adapters/actordb-adapter');

actorAdapter.search('actor_10340', [], function(resultCode, rows) {
    if(rows.length>0) {
        for (i in rows) {
            console.log(rows[i].name);
        }
    }
    else{
        console.log('fail');
    }
});