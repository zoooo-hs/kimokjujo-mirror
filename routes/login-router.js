var router = require('express').Router();
var user1Adapter = require('../adapters/user1db-adapter');
var user2Adapter = require('../adapters/user2db-adapter');
var sessionAdapter = require('../adapters/sessiondb-adapter');
var sendHTML = require('../adapters/send-html').sendHTML;
const dbResultCode = require('../status-codes/db-result');
const Session = require('../models/session');

var uniqid = require('uniqid');

var id;
var password;
var userType;
var session = []; //user의 session 한번에 저장 user1,user2의 구분 없음

router.route('/').get(function (req, res, next) {
    sendHTML('login', res, next);
});
router.route('/').post(function(req,res){
    id = req.body.id;
    password = req.body.password;
    userType = req.body.userType;

    if(userType==1){
        user1Adapter.search(id,[],function(resultCode,rows){
            if(resultCode==dbResultCode.OK){
                if(rows.length>0){
                    if(rows[0].password == req.body.password){
                        var session = new Session(uniqid(), userType, id);
                        sessionAdapter.write(session, function (resultCode, rows) {
                            if (resultCode == dbResultCode.OK) {
                                res.json({"success":true, sessionkey:session.sessionKey});
                            }
                            else {
                                res.json({"success": false});
                            }
                        });
                    }
                    else {
                        console.log("false reason: wrong pw");
                        res.json({"success":false});
                    }
                }
                else {
                    console.log("false reason: wrong id");
                    res.json({"success":false});
                }
            }
            else {
                console.log("false reason: query false");
                res.json({"success": false})
            }
            });
    }
    
    else if(userType==2) {
        user2Adapter.search(id,[],function (resultCode,rows) {
            console.log("resultCode:"+resultCode);
            if(resultCode==dbResultCode.OK) {
                if (rows.length > 0) {
                    if(rows[0].password == req.body.password) {
                        var session = new Session(uniqid(), userType, id);
                        sessionAdapter.write(session, function (resultCode, rows) {
                            if (resultCode == dbResultCode.OK) {
                                res.json({"success":true, sessionkey:session.sessionKey});
                            }
                            else {
                                res.json({"success": false});
                            }
                        });
                    }
                    else {
                        console.log("false reason: wrong pw");
                        res.json({"success":false});
                    }
                }
                else {
                    console.log("false reason: wrong id");
                    res.json({"sucess": false});
                }
            }
            else {
                console.log("false reason: query false");
                res.json({"sucess":false});
            }
        });
    }
});

module.exports = router;