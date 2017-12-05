var router = require('express').Router();
var trendAdapter = require('../adapters/trend-adapter');
const dbResultCode = require('../status-codes/db-result');

router.get('/:actorId', function(req, res) {
    var actorId; 
    var returnJSON = {success : false};


    if (req.params.actorId == undefined) {
        res.json(returnJSON);
    }
    else {
        actorId = req.params.actorId;
    }

    trendAdapter.searchActorPowerTrend(actorId, function(resultCode, rows) {
        if (resultCode == dbResultCode.OK) {
            returnJSON.success = true;
            
            returnJSON.power = rows;
            res.json(returnJSON);
        }
        else {
            res.json(returnJSON);
        }
    });
});

module.exports = router;