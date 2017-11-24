var router = require('express').Router();
var user1Adapter = require('../adapters/user1db-adapter');
var user2Adapter = require('../adapters/user2db-adapter');

const User1 = require('../models/user1');
const User2 = require('../models/user2');

const dbResultCode = require('../status-codes/db-result');

router.get('/', function(req, res){

    var html = "<html><body>singup_test</body></html>"

    res.write(html);
    res.end();
});

router.post('/', function(req, res){

    // user1 or user 2
    if (req.body.userType == 1) {
        
        user1Adapter.search(req.body.id, null, function(resultCode, rows) {
            if (resultCode == dbResultCode.Fail) {
                res.json({ success: false });
            }
            else {
                var user1 = new User1(req.body.id, req.body.password, req.body.address, req.body.contact, req.body.financialInfo, req.body.companyName, req.body.companyLicense);
                user1Adapter.write(user1, function (resultCode) {
                    if (resultCode == dbResultCode.Fail) {
                        res.json({ success: false });
                    } else {
                        res.json({ success: true });
                    }
                });
            }
        });
    } else {
        user2Adapter.search(req.body.id, null, function(resultCode, rows) {
            if (resultCode == dbResultCode.Fail) {
                res.json({ success: false });
            }
            else { 
                var user2 = new User2(req.body.id, req.body.password, req.body.address, req.body.contact, req.body.financialInfo, req.body.name);
                user2Adapter.write(user2, function (resultCode) {
                    if (resultCode == dbResultCode.Fail) {
                        res.json({ success: false });
                    } else {
                        res.json({ success: true });
                    }
                });
            } 
        });
    }
});

router.post('/dup-id', function(req, res){

    if (req.body.userType == 1) {
        user1Adapter.search(req.body.id, null, function(resultCode, rows){
            if (resultCode == dbResultCode.Fail) {
                res.json({success: false});
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
            if (resultCode == dbResultCode.Fail) {
                res.json({'success': false})
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