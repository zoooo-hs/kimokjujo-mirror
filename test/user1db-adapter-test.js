var ad = require('../adapters/user1db-adapter');

ad.search(3, [], function(resultCode, rows) {
    for (i in rows) {
        console.log(rows[i]);
    }
});