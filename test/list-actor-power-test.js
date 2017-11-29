var listActorPowerAdapter = require('../adapters/list-actorpowerdb-adapter');

const dbResultCdoe = require('../status-codes/db-result');

listActorPowerAdapter.getList(['actor_13', 'actor_45'], function(resultCode, rows) {
    if (resultCode == dbResultCdoe.OK) {
        console.log(rows);
    }
    else {
        console.log('err');
    }
});