var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');
var dbResultCode = require('../status-codes/db-result');
var PlanMovie = require('../models/plan-movie');
var PlanMovieActor = require('../models/plan-movie-actor');
var PlanMovieUser = require('../models/plan-movie-user');
var planMovieAdapter = require('../adapters/plan-moviedb-adapter');
var planMovieActorAdapter = require('../adapters/plan-movie-actordb-adapter');
var planMovieUserAdapter = require('../adapters/plan-movie-userdb-adapter');
var listActorPowerAdapter = require('../adapters/list-actorpowerdb-adapter');
var engineAdapter = require('../adapters/engine-adapter');

router.route('/').get(function (req, res, next) {

    var sessionKey = req.cookies.sessionkey;

    sessionAdapter.typeCheck(sessionKey, function (userType) {
        if (userType == 1) {
            res.write("user1 newplan");
            res.end();
        }
        else if (userType == 2) { 
            res.write("user2 newplan");
            res.end();
        }
        else {
            next();
        }
    });
});

router.route('/').post(function(req, res, next){
    var sessionKey = req.cookies.sessionkey;
    var userId = req.cookies.userId;

    sessionAdapter.typeCheck(sessionKey, function (userType) {
        if (userType) {
            var planMovie = new PlanMovie(1,
                req.body.title,
                req.body.original,
                req.body.originalVisible,
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
                                            next();
                                        }
                                        else {
                                            var returnValue = {}
                                            listActorPowerAdapter.getList([req.body.actor1Id, req.body.actor2Id], function(resultCode, rows) {
                                                if (resultCode == dbResultCode.OK) {
                                                    returnValue.success = true;
                                                    returnValue.planMovie = planMovie;
                                                    delete returnValue.planMovie.id;
                                                    returnValue.actors = [req.body.actor1Id, req.body.actor2Id];
                                                    returnValue.result = {audience: engineResult[0], breakEvenPoint: engineResult[1]};
                                                    returnValue.similarActors = rows;
                                                    
                                                    // if user is user2 add scenario
                                                    if (userType == 2) {
                                                        returnValue.scenario = req.body.scenario;
                                                    }

                                                    res.json(returnValue);
                                                }
                                                else {
                                                    next();
                                                }
                                            });
                                        }
                                    });
                                }
                                else {
                                    next();
                                }
                            });
                        }
                        else {
                            next();
                        }
                    });
                }
                else {
                    next();
                }
            });
        }
        else{
            next();
        }
    });
});


module.exports = router;