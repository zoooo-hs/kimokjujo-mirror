var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');
var planMovieAdapter = require('../adapters/plan-moviedb-adapter');
var planMovieActorAdapter = require('../adapters/plan-movie-actordb-adapter');
var planMovieUserAdapter = require('../adapters/plan-movie-userdb-adapter');

const dbResultCode = require('../status-codes/db-result');

// host/history : return histories data 
router.get('/', function(req, res, next) {

    console.log(req.cookies)

    // var sessionKey = req.cookies.sessionkey;
    var sessionKey = 'hello';

    sessionAdapter.search(sessionKey, null, function (resultCode, rows) {
        
        if (resultCode == dbResultCode.OK) {
            if (rows.length != 0) {
                var userId = rows[0].userId;
                console.log(userId)

                var result = [];

                planMovieAdapter.searchByUserId(userId, null, function(resultCode, rows) {
                    if (resultCode == dbResultCode.OK) {
                        if (rows.length != 0) {
                            for (var i in rows) {
                                console.log(rows[i])
                                var row = rows[i];
                                var planMovie = {};
                                var actors;
                                actors = row.actorIds.split(',');
                                planMovie = row;
                                delete row.actorIds;

                                result.push({'planMovie': planMovie, 'actors': actors});

                            }
                            res.json({planMovies: result}); 
                        } 
                        else { 
                            next();
                        }
                    }
                    else {
                        next();
                    } 
                }); 
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

router.get('/:planMovieId', function(req, res, next) {

});

module.exports = router;