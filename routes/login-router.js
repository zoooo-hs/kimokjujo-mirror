var router = require('express').Router();
var user1adapter = require('../adapters/user1db-adapter');
var user2adapter = require('../adapters/user2db-adapter');
const dbResultCode = require('../status-codes/db-result');
var id;
var password;
var userType;
var session = []; //user의 session 한번에 저장 user1,user2의 구분 없음

router.route('/').get(function (req,res) {
    //res.render('login.html');
    res.write("<html>");
    res.write("  <head>");
    res.write("    <title>login</title>");
    res.write("    </head>");
    res.write("   <body>");
    res.write("    hi ");
    res.write("    </body>");
    res.write(     "</html>");
    res.end();
    }
);
router.route('/').post(function(req,res){
    id = req.body.id;
    password = req.body.password;
    userType = req.body.userType;

    if(userType==1){
        user1adapter.search(id,[],function(resultCode,rows){
            if(resultCode==dbResultCode.OK){
                if(rows.length>0){
                    if(rows[0].password == req.body.password){
                        session.push({sessionkey:'12345',type:userType,id:id});//회원 세션, id와 usertype 1인지 2인지 저장, 세션 키 저장
                        res.json({"success":true,sessionkey:'12345'});
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
        user2adapter.search(id,[],function (resultCode,rows) {
            console.log("resultCode:"+resultCode);
            if(resultCode==dbResultCode.OK) {
                if (rows.length > 0) {
                    if(rows[0].password == req.body.password) {
                        session.push({sessionkey: '34567', type: userType, id: id});
                        return res.json({"success": true, "sessionkey": '34567'});
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