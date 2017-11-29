var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');
var planMovieAdapter = require('../adapters/plan-moviedb-adapter');
var resultMovieAdapter = require('../adapters/result-moviedb-adapter');

const dbResultCode = require('../status-codes/db-result');

// host/history : return histories data 
router.get('/', function(req, res, next) {

    var sessionKey = req.cookies.sessionkey;

    sessionAdapter.search(sessionKey, null, function (resultCode, rows) {

        if (resultCode == dbResultCode.OK) {
            if (rows.length != 0) {
                var userId = rows[0].userId;

                var result = [];

                planMovieAdapter.searchByUserId(userId, null, function(resultCode, rows) {
                    if (resultCode == dbResultCode.OK) {
                        for (var i in rows) {
                            var row = rows[i];
                            var planMovie = {};
                            var actors = row.actorIds.split(',');
                            planMovie = row;
                            delete row.actorIds;

                            result.push({ 'planMovie': planMovie, 'actors': actors });

                        }
                        res.json({ planMovies: result });
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

    var sessionKey = req.cookies.sessionkey;

    var userType = req.cookies.userType;

    var userCheck = false;

    var inputPlanMovieId = req.params.planMovieId;

    sessionAdapter.search(sessionKey, null, function (resultCode, rows) {

        if (resultCode == dbResultCode.OK) {
            if (rows.length != 0) {

                var userId = rows[0].userId;

                var result = {};

                planMovieAdapter.searchByUserId(userId, null, function(resultCode, rows) {
                    if (resultCode == dbResultCode.OK) {
                        for (var i in rows) {
                            var row = rows[i];
                            var planMovie = {};
                            var actors = row.actorIds.split(',');
                            planMovie = row;
                            delete row.actorIds;
                            if(inputPlanMovieId == planMovie.id){
                                console.log(planMovie.id);
                                userCheck = true;
                                break;
                            }
                            else {
                                next();
                            }
                        }
                        if(userCheck == true){
                            resultMovieAdapter.searchByPlanMovieId(planMovie.id, [], function(resultCode, rows){
                                if( resultCode = dbResultCode.OK) {
                                    var resultMovie = rows[0];
                                    if(userType==1){
                                        result=
                                            {
                                                planMovie: {
                                                    id: planMovie.id,
                                                    title: planMovie.title,
                                                    original: planMovie.original,
                                                    _3words: planMovie._3words,
                                                    budget: planMovie.budget,
                                                    releaseMonth: planMovie.releaseMonth,
                                                    contentRate: planMovie.contentRate,
                                                    directorId: planMovie.directorId,
                                                    makerId: planMovie.makerId,
                                                    genre: planMovie.genre
                                                },
                                                actors: actors,
                                                planMovieResult: {
                                                    date: resultMovie.date,
                                                    scenario: resultMovie.scenario,
                                                    audience: resultMovie.audience,
                                                    breakEvenPoint: resultMovie.breakEvenPoint,
                                                    contract: resultMovie.contract
                                                }
                                            };
                                    }
                                    else{
                                        result=
                                            {
                                                planMovie: {
                                                    id: planMovie.id,
                                                    title: planMovie.title,
                                                    original: planMovie.original,
                                                    _3words: planMovie._3words,
                                                    budget: planMovie.budget,
                                                    releaseMonth: planMovie.releaseMonth,
                                                    contentRate: planMovie.contentRate,
                                                    directorId: planMovie.directorId,
                                                    makerId: planMovie.makerId,
                                                    genre: planMovie.genre
                                                },
                                                actors: actors
                                            };
                                    }
                                    res.json({ planMovies: result });
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