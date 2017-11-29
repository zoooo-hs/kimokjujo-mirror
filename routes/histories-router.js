var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');
var sendHtml = require('../adapters/send-html');

const dbResultCode = require('../status-codes/db-result');

router.get('/',function(res, req, next){
    console.log(req.cookies);

    var sessionKey = req.cookies.sessionkey;

    sessionAdapter.search(sessionKey, null, function (resultCode, rows) {

        if (resultCode == dbResultCode.OK) {
            if (rows.length != 0) {
                var userId = rows[0].userId;
                console.log(userId);

                //sendHtml.sendHTML('history', res, next);

                res.write('histories');

                res.end();

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

router.get('/:planMovieId',function(res, req, next){

    console.log(req.cookies);

    var sessionKey = req.cookies.sessionkey;

    sessionAdapter.search(sessionKey, null, function (resultCode, rows) {

        if (resultCode == dbResultCode.OK) {
            if (rows.length != 0) {
                var userId = rows[0].userId;
                console.log(userId);

                //sendHtml.sendHTML('movie-info', res, next);

                res.write('Movie information');

                res.end();

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