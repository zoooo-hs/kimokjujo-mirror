var router = require('express').Router();
var user1Adapter = require('../adapters/user1db-adapter');
var user2Adapter = require('../adapters/user2db-adapter');

const User1 = require('../models/user1');
const User2 = require('../models/user2');

router.get('/', function(req, res){

    var html = "<html><body>singup_test</body></html>"

    res.write(html);
    res.end();
});

router.post('/', function(req, res){

    // user1 or user 2
    if (req.body.userType == 1) {
        
        user1Adapter.search(req.body.id, null, function(resultCode, rows) {
            if (resultCode == user1Adapter.resultCode.Fail) {
                // TODO: error
            } 
            var user1 = new User1(req.body.id, req.body.passsword, req.body.address, req.body.contact, null, req.body.companyName, req.body.companyLicense);
            user1Adapter.write(user1, function(resultCode){
                if (resultCode == user1Adapter.resultCode.Fail) {
                    res.json({success: false});
                } else {
                    res.json({success: true});
                }
            });
        });
    } else {
        user2Adapter.search(req.body.id, null, function(resultCode, rows) {
            if (resultCode == user2Adapter.resultCode.Fail) {
                // TODO: error
            } 
            var user2 = new User2(req.body.id, req.body.passsword, req.body.address, req.body.contact, null, req.body.name);
            user2Adapter.write(user2, function(resultCode){
                if (resultCode == user2Adapter.resultCode.Fail) {
                    res.json({success: false});
                } else {
                    res.json({success: true});
                }
            });
        });
    }
});

router.post('/dup-id', function(req, res){

    if (req.body.userType == 1) {
        user1Adapter.search(req.body.id, null, function(resultCode, rows){
            if (resultCode == user1Adapter.resultCode.Fail) {
                // TODO: error
            }
            if (rows.length > 0) {
                res.json({'success': false});
            } else {
                res.json({'success': true});
            }
        });
    }
    else{
        user2Adapter.search(req.body.id, null, function(resultCode, rows){
            if (resultCode == user2Adapter.resultCode.Fail) {
                // TODO: error
            }

            if (rows.length > 0) {
                res.json({'success': false});
            } else {
                res.json({'success': true});
            }
        });
    }
});

module.exports = router;