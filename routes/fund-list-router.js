var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');
var sendHtml = require('../adapters/send-html');

const dbResultCode = require('../status-codes/db-result');

router.get('/',function(req, res, next){

    console.log(req.cookies);

    var sessionKey = req.cookies.sessionkey;

    sessionAdapter.search(sessionKey, null, function (resultCode, rows) {

        if (resultCode == dbResultCode.OK) {
            if (rows.length != 0) {
                if (req.cookies.userType == 1) {
                    var userId = rows[0].userId;
                    console.log(userId);

                    sendHtml.sendHTML('fund-list', res, next); 
                }
                else {
                    next();
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

router.get('/:planMovieId',function(req, res, next){

    console.log(req.cookies);

    var sessionKey = req.cookies.sessionkey;

    sessionAdapter.search(sessionKey, null, function (resultCode, rows) {

        if (resultCode == dbResultCode.OK) {
            if (rows.length != 0) {
                var userId = rows[0].userId;
                console.log(userId);

                sendHtml.sendHTML('fund-info', res, next); 
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