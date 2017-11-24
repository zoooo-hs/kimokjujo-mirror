var router = require('express').Router();
router.route('/').get(function (req,res) {
        //res.render('plan-movie.html');
        res.write("<html>");
        res.write("  <head>");
        res.write("    <title>movie plan</title>");
        res.write("    </head>");
        res.write("   <body>");
        res.write("    plan input ");
        res.write("    </body>");
        res.write(     "</html>");
        res.end();
    }
);

router.route('/').post(function(req,res){
  /*
    req.body.title
    req.body['3words']
    req.body.original
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