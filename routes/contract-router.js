var router = require('express').Router();
var contractAdapter = require('../adapters/contract-adapter');

const dbResultCode = require('../status-codes/db-result');

router.post('/', function (req, res) {

    var userId = req.cookies.userId;
    var planMovieId = req.cookies.planMovieId;

    if (req.cookies.userId == undefined || req.body.planMovieId == undefined) {
        return res.json({success: false});
    }

    else {
        contractAdapter.updateUserId(planMovieId, userId, function (resultCode) {
            if(resultCode == dbResultCode.Fail){
                res.json({success: false});
            }
            else{
                //메일을 보낸다!  
                res.json({success: true});
            }
        });
    }
});

module.exports = router;