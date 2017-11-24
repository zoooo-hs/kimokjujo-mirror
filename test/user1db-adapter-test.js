var ad = require('../adapters/user1db-adapter');

ad.search('dogfooter', [], function(resultCode, rows) {
    for (i in rows) {
        console.log(rows[i]);
    }
    console.log('hello');
});