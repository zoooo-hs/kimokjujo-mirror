var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');
var dbResultCode = require('../status-codes/db-result');
var PlanMovie = require('../models/plan-movie');
var ResultMovie = require('../models/result-movie');
var PlanMovieActor = require('../models/plan-movie-actor');
var PlanMovieUser = require('../models/plan-movie-user');
var planMovieAdapter = require('../adapters/plan-moviedb-adapter');
var planMovieActorAdapter = require('../adapters/plan-movie-actordb-adapter');
var planMovieUserAdapter = require('../adapters/plan-movie-userdb-adapter');
var resultMovieAdapter = require('../adapters/result-moviedb-adapter');
var listActorPowerAdapter = require('../adapters/list-actorpowerdb-adapter');
var engineAdapter = require('../adapters/engine-adapter');
var sendHTML = require('../adapters/send-html').sendHTML;

router.route('/').get(function (req, res, next) {

    var sessionKey = req.cookies.sessionkey;

    sessionAdapter.typeCheck(sessionKey, function (userType) {
        if (userType == 1) {
            sendHTML('plan-movie', res, next);
        }
        else if (userType == 2) { 
            sendHTML('plan-movie', res, next);
        }
        else {
            next();
        }
    });
});

router.route('/').post(function(req, res, next){
    var sessionKey = req.cookies.sessionkey;

    var returnJSON = {success: false};

    var userId = req.cookies.userId;


    sessionAdapter.typeCheck(sessionKey, function (userType) {
        if (userType) {

            var original_;
            var originalVisible_;


            var originalChunk = req.body.original.split('/');
            if (originalChunk.length == 2) {
                original_ = originalChunk[1];
                originalVisible_ = originalChunk[0];
            }
            else {
                res.json(returnJSON);
            }

            var planMovie = new PlanMovie(1,
                req.body.title,
                original_,
                originalVisible_,
                req.body.budget,
                req.body._3words,
                req.body.releaseMonth,
                req.body.genre,
                req.body.contentRate,
                req.body.directorId,
                req.body.makerId
            );
            planMovieAdapter.write(planMovie, function(resultCode, planMovieId){
                if (resultCode == dbResultCode.OK) {
                    var planMovieActor1 = new PlanMovieActor(1, planMovieId, req.body.actor1Id);
                    var planMovieActor2 = new PlanMovieActor(1, planMovieId, req.body.actor2Id);
                    planMovieActorAdapter.writeActors([planMovieActor1, planMovieActor2], function(resultCode) {
                        if (resultCode == dbResultCode.OK) {
                            var planMovieUser = new PlanMovieUser(1, planMovieId, userId);
                            planMovieUserAdapter.write(planMovieUser, function(resultCode) {
                                if (resultCode == dbResultCode.OK) {
                                    engineAdapter.runEngine(planMovieId, req.body.actor1Id, req.body.actor2Id, function(err, engineResult) {
                                        if (err) {
                                            res.json(returnJSON);
                                        }
                                        else {
                                            listActorPowerAdapter.getList([req.body.actor1Id, req.body.actor2Id], function(resultCode, rows) {
                                                if (resultCode == dbResultCode.OK) {

                                                    returnJSON.success = true;
                                                    returnJSON.planMovie = planMovie;
                                                    delete returnJSON.planMovie.id;
                                                    returnJSON.actors = [req.body.actor1Id, req.body.actor2Id];
                                                    returnJSON.similarActors = rows;
                                                    
                                                    var resultMovie = new ResultMovie(1, planMovieId, (new Date()).toISOString().substring(0, 10), '', engineResult[0], engineResult[1], '');
                                                    // if user is user2 add scenario
                                                    if (userType == 2) {
                                                        returnJSON.scenario = req.body.scenario;
                                                        resultMovie.scenario = req.body.scenario;
                                                    }
                                                    returnJSON.planMovieResult = resultMovie;

                                                    resultMovieAdapter.write(resultMovie, function(resultCode) {
                                                        if (resultCode == dbResultCode.OK) {
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
                                            });
                                        }
                                    });
                                }
                                else {
                                    res.json(returnJSON);
                                }
                            });
                        }
                        else {
                            res.json(returnJSON);
                        }
                    });
                }
                else {
                    res.json(returnJSON);
                }
            });
        }
        else{
            res.json(returnJSON);
        }
    });
});


module.exports = router; 