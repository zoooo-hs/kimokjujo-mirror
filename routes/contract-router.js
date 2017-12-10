var router = require('express').Router();
var contractAdapter = require('../adapters/contract-adapter'); 
var mailAdapter = require('../adpaters/mail-adapter');
var planMovieUserAdapter = require('../adapters/plan-movie-userdb-adapter');
var user1Adapter = require('../adapters/user1db-adapter');

const dbResultCode = require('../status-codes/db-result');
const Mail = require('../models/mail');

router.post('/', function (req, res) {

    var userId = req.cookies.userId;
    var planMovieId = req.body.planMovieId;

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
                planMovieUserAdapter.searchByPlanMovieId(planMovieId, [], function(resultCode, rows) {
                    if (resultCode == dbResultCode.OK || rows.length == 1) {
                        var receiver = rows[0];
                        user1Adapter.search(userId, cols, function(resultCode, rows) {
                            if (resultCode == dbResultCode.OK || rows.length == 1) {
                                var requester = rows[0];

                                var title = '[KIMOKJUJO.CO] New Contract Request!';
                                var content = 'Hello ' + receiver.id +'\n\nThere is a new contract request\n\nEmail: ' + requester.address + '\n\nThank you :)';

                                var newMail = new Mail(rows[0].address, title, content);

                                mailAdapter.sendMail(newMail, function(err) {
                                    if (err) {
                                        console.log(err); 
                                        res.json({success: false});
                                    }
                                    else {
                                        res.json({success: true}); 
                                    }

                                }); 
                            }
                            else {
                                res.json({success: false});
                            } 
                        });
                    }
                    else { 
                        res.json({success: false});
                    }
                }); 
                res.json({success: false});
            }
        });
    }
});

module.exports = router;
