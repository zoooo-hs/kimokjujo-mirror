var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');

const dbResultCode = require('../status-codes/db-result');

router.get('/', function(req, res) {
    var sessionKey = req.cookies.sessionkey;

    var returnJSON = {success: false};

    sessionAdapter.search(sessionKey, null, function(resultCode, rows) {
        if (resultCode == dbResultCode.OK) {
            if (rows.length == 0) {
                res.json(returnJSON);
            }
            else {
                sessionAdapter.delete(sessionKey, function(err) {
                    returnJSON.success = true;
                    res.clearCookie('userId');
                    res.clearCookie('userType');
                    res.clearCookie('sessionkey');
                    res.json(returnJSON);
                });
            }
        }
        else {
            res.json(returnJSON);
        }
    });
});

module.exports = router;