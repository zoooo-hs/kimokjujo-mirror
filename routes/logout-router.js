var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');

const dbResultCode = require('../status-codes/db-result');

router.get('/', function(req, res) {
    var sessionKey = req.cookies.sessionkey;

    var returnJSON = {success: false};

    sessionAdapter.search(sessionKey, null, function(resultCode, rows) {
        if (resultCode == dbResultCode.OK) {
            if (rows.length == 0) {
                res.redirect('/');
            }
            else {
                sessionAdapter.delete(sessionKey, function(err) {
                    returnJSON.success = true;
                    res.clearCookie('userId');
                    res.clearCookie('userType');
                    res.clearCookie('sessionkey');
                    res.redirect('/');
                });
            }
        }
        else {
            res.redirect('/');
        }
    });
});

module.exports = router;