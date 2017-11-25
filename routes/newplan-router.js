var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');
var dbResultCode = require('../status-codes/db-result');
var PlanMovie = require('../models/plan-movie');
var PlanMovieActor = require('../models/plan-movie-actor');
var PlanMovieUser = require('../models/plan-movie-user');
var planMovieAdapter = require('../adapters/plan-moviedb-adapter');
var planMovieActorAdapter = require('../adapters/plan-movie-actordb-adapter');
var planMovieUserAdapter = require('../adapters/plan-movie-userdb-adapter');
var monthlyPowerAdapter = require('../adapters/monthly-powerdb-adapter');

router.route('/').get(function (req, res, next) {

        var sessionKey = req.cookies.sessionkey;

        sessionAdapter.typeCheck(sessionKey, function (userType) {
            if (userType == 1) {
                res.write("user1 newplan");
                res.end();
            }
            else {
                next();
            }
        });
    }
);

router.route('/').post(function(req, res, next){
    var sessionKey = req.cookies.sessionkey;
    sessionAdapter.typeCheck(sessionKey, function (userType) {
        if (userType == 1) {
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
                if(resultCode == dbResultCode.OK){
                    var planMovieActor1 = new PlanMovieActor(1, planMovieId, req.body.actor1Id);
                    var planMovieActor2 = new PlanMovieActor(1, planMovieId, req.body.adtor2Id);
                    planMovieActorAdapter.write(planMovieActor1, function(resultCode){
                        if(resultCode == dbResultCode.OK){
                            planMovieActorAdapter.write(planMovieActor2, function(resultCode){
                                if(resultCode == dbResultCode.OK){
                                    var planMovieUser = new PlanMovieUser(1, planMovieId, req.cookies.userId);
                                    planMovieUserAdapter.write(planMovieUser,function(resultCode){
                                        if(resultCode == dbResultCode.OK){
                                            console.log("run engine");
                                            //engine 추가
                                            //돌아갔음
                                            /*
{ success: [true|false],
result: {audience: int, breakEvenPoint: [true|false]},
planMovie: {title:영화명, _3words:세글자여부, original:원작,  budget:예산, releaseMonth:개봉 월, contentRate:관람가, actor1Id:배우1, actor2Id:배우2, directorId:감독, makerId:제작사, genre:장르}
, similarActors: [{name: string, power: int} .. ]}
*/
                                            monthlyPowerAdapter.search(req.body.actor1Id, [], function(resultCode, rows){
                                                if(resultCode == dbResultCode.OK){
                                                    var monthlyActorPower1 = rows[0].power;
                                                    //list-actorpowerdb-adapter를 불러와서 getlist(monthlyActorPower1)함수 수행하기
                                                }
                                                else{

                                                }
                                            });
                                            monthlyPowerAdapter.search(req.body.actor2Id, [], function(resultCode, rows){
                                                if(resultCode == dbResultCode.OK){
                                                    var monthlyActorPower2 = rows[0].power;
                                                    //list-actorpowerdb-adapter를 불러와서 getlist(monthlyActorPower2)함수 수행하기
                                                }
                                                else{

                                                }
                                            });

                                            var returnValue = {};
                                            returnValue.success = true;
                                            returnValue.result = {audience:123, breakEvenPoint:false};
                                            returnValue.planMovie = planMovie;
                                            returnValue.planMovie.actor1Id = req.body.actor1Id;
                                            returnValue.planMovie.actor2Id = req.body.actor2Id;
                                            returnValue.similarActors = {};
                                        }

                                        else{
                                            console.log("error");
                                            next();
                                        }
                                    });
                                }
                                else{
                                    next();
                                }
                            });
                        }
                        else {
                            next();
                        }
                    });
                }
            });
        }
        else{
            next();
        }
    });
});


module.exports = router;