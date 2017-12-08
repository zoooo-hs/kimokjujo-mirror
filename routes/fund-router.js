var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');
var planMovieAdapter = require('../adapters/plan-moviedb-adapter');
var resultMovieAdapter = require('../adapters/result-moviedb-adapter');
var planMovieActorAdapter = require('../adapters/plan-movie-actordb-adapter');

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

    // 여기서 플랜무비 찾고 리절트 찾고 액터 찾고 다 해야 보낼 수 있음
    
        console.log(req.cookies);
    
        var planMovieId = req.params.planMovieId;
        var sessionKey = req.cookies.sessionkey;
    
        sessionAdapter.search(sessionKey, null, function (resultCode, rows) {
    
            if (resultCode == dbResultCode.OK) {
                if (rows.length != 0) {
                    var userId = rows[0].userId;

                    planMovieAdapter.search(planMovieId, [] , function(resultCode, planMovie) {

                        if (resultCode == dbResultCode.OK) {
                            resultMovieAdapter.searchByPlanMovieId(planMovieId, [], function(resultCode, resultMoive) {
                                if (resultCode == dbResultCode.OK) {
                                    planMovieActorAdapter.searchByPlanMovieId(planMovieId, [], function(resultCode, actors) {
                                        if (resultCode == dbResultCode.OK) {

                                            var returnJSON = {success: true};
                                            try {
                                                returnJSON.planMovie = planMovie[0];
                                                returnJSON.planMovieResult = resultMoive[0];
                                                returnJSON.actors = [];
                                                for (var i in actors) {
                                                    returnJSON.actors.push(actors[i].actorId);
                                                } 
                                            }
                                            catch (e) {
                                                returnJSON.success = false;
                                            }
                                            res.json(returnJSON); 
                                        }
                                        else { 
                                            res.json({ success: false });
                                        }
                                    });
                                }
                                else {
                                    res.json({ success: false });
                                }
                            });
                        }
                        else {
                            res.json({success: false});
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
module.exports = router;