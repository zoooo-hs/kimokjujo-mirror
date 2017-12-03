var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');
var sendHTML = require('../adapters/send-html').sendHTML;

const dbResultCode = require('../status-codes/db-result');

router.get('/', function(req, res, next){
    var sessionKey = req.cookies.sessionkey;

    sessionAdapter.search(sessionKey, [], function (resultCode, rows) {

        if (resultCode ==dbResultCode.OK) {
            if (rows.length > 0) {
                if (rows[0].userType == 1) {
                    sendHTML('user1-main', res, next);
                }
                else if (rows[0].userType == 2) {
                    sendHTML('user2-main', res, next);
                }
                else {
                    next();
                }
            }
            else {
                res.redirect('/');
            }
        }
        else {
            res.redirect('/');
        }
    });
});


module.exports = router;