var router = require('express').Router();
var sessionAdapter = require('../adapters/sessiondb-adapter');
var likeItAdapter = require('../adapters');

const dbResultCode = require('../status-codes/db-result');

router.post('/', function (req, res) {


    var returnJSON = { success: false };

    if (req.cookies.sessionkey == undefined || req.cookies.userType != 1 || req.cookies.userId == undefined || req.body.planMovieId == undefined) {
        return res.json(returnJSON);
    }

    var sessionKey = req.cookies.sessionkey;
    var userId = req.cookies.userId;
    var userType = req.cookies.userType;

    var planMovieId = req.body.planMovieId;

    sessionAdapter.search(sessionKey, [], function (resultCode, rows) {
        if (resultCode == dbResultCode.OK && rows.length > 0) {

            likeItAdapter.write(userId, planMovieId, function (resultCode) {
                if (resultCode == dbResultCode.OK) {
                    likeItAdapter.countLike(planMovieId, function (resultCode, rows) {
                        if (resultCode == dbResultCode.OK) {
                            returnJSON.likeCount = rows[0].cnt;
                            returnJSON.success = true;

                            res.json(returnJSON)
                        }
                        else {
                            res.json(returnJSON)
                        }

                    });
                }
                else {
                    res.json(returnJSON)
                }
            });
        }
        else {
            res.json(returnJSON)
        }
    });
});