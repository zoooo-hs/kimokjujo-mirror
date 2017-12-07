var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');
var planMovieAdapter = require('../adapters/plan-moviedb-adapter');
var resultMovieAdapter = require('../adapters/result-moviedb-adapter');

const dbResultCode = require('../status-codes/db-result');

// host/history : return histories data 
router.get('/', function(req, res, next) {

    var sessionKey = req.cookies.sessionkey;

    var returnJSON = {success: false};

    sessionAdapter.search(sessionKey, null, function (resultCode, rows) {

        if (resultCode == dbResultCode.OK) {
            if (rows.length != 0) {
                var userId = rows[0].userId;

                var result = [];

                resultMovieAdapter.searchFundList(function(resultCode, rows) {
                    if (resultCode == dbResultCode.OK) {
                        for (var i in rows) {
                            var row = rows[i];
                            var planMovie = {};
                            // var actors = row.actorIds.split(',');
                            var actors = ['actor_0', 'actor_0'];
                            planMovie = row;
                            delete row.actorIds;

                            result.push({'planMovie': planMovie, 'actors': actors });

                        }

                        returnJSON.success = true;
                        returnJSON.planMovies = result;

                        res.json(returnJSON);
                    }
                    else {
                        res.json(returnJSON);
                    }
                });
            }
            else {
                res.json(returnJSON);
            }
        }
        else {
            res.json(returnJSON);
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