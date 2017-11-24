var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');

const dbResultCode = require('../status-codes/db-result');

router.get('/', function(req, res, next){
    var sessionKey = req.cookies.sessionkey;

    sessionAdapter.search(sessionKey, [], function (resultCode, rows) {

        if (resultCode ==dbResultCode.OK) {
            if (rows.length > 0) {
                if (rows[0].userType == 1) {
                    res.write('use1 page');
                    res.end();
                }
                else {
                    res.write('use1 page');
                    res.end();
                }
            }
            else {
                next();
            }
        }
        else {
            next();
        }
    });
});


module.exports = router;