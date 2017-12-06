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

router.get('/:planMovieId', function (req, res, next) {

    var sessionKey = req.cookies.sessionkey;

    var returnJSON = { success: false };

    var userType = req.cookies.userType;

    var userCheck = false;

    var inputPlanMovieId = req.params.planMovieId;

    sessionAdapter.search(sessionKey, null, function (resultCode, rows) {

        if (resultCode == dbResultCode.OK) {
            if (rows.length != 0) {

                var userId = rows[0].userId;

                var result = {};

                planMovieAdapter.searchByUserId(userId, null, function (resultCode, rows) {
                    if (resultCode == dbResultCode.OK) {
                        for (var i in rows) {
                            var row = rows[i];
                            var planMovie = {};
                            var actors = row.actorIds.split(',');
                            planMovie = row;
                            delete row.actorIds;
                            if (inputPlanMovieId == planMovie.id) {
                                console.log(planMovie.id);
                                userCheck = true;
                                break;
                            }
                            else {
                                continue;
                            }
                        }
                        if (userCheck == true) {
                            resultMovieAdapter.searchByPlanMovieId(planMovie.id, [], function (resultCode, rows) {
                                if (resultCode = dbResultCode.OK) {
                                    var resultMovie = rows[0];
                                    returnJSON.success = true;
                                    returnJSON.planMovie = {
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
                                    };
                                    returnJSON.actors = actors;
                                    returnJSON.planMovieResult = {
                                        date: resultMovie.date,
                                        scenario: resultMovie.scenario,
                                        audience: resultMovie.audience,
                                        breakEvenPoint: resultMovie.breakEvenPoint,
                                        contract: resultMovie.contract
                                    };
                                    res.json(returnJSON);
                                } // resultcode ok
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

module.exports = router;