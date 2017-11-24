var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');

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

router.route('/').post(function(req,res){
  /*
    req.body.title
    req.body['3words']
    req.body.original
    req.body.originalVisible
    req.body.budget
    req.body.releasseMonth
    req.body.contentRate
    req.body.actor1Id
    req.body.actor2Id
    req.body.directorId
    req.body.makerId
    req.body.genre
dbadpter module 불러서 각각에 맞는 table에 insert해주기!
model module화해서 위 데이터 돌리기
*/
  //result주기
    //res.json({success:true, result:{'audience':12343245,'breakEvenPoint':true}, planMovie:{'title':'hello','3words':false,'original':'novel','budget':'1000000000','releaseMonth':2,'contentRate':'12세관람가'}});
});
module.exports = router;