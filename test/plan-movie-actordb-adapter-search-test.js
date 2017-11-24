var planMovieActorAdapter = require('../adapters/plan-movie-actordb-adapter');
const PlanMovieActor = require('../models/plan-movie-actor');
const dbResultCode = require('../status-codes/db-result');

planMovieActorAdapter.searchByPlanMovieId('hell', [], function(resultCode, rows){
    if (resultCode == dbResultCode.OK) {
        for (var i in rows) {
            console.log('Count (i) : ' + JSON.stringify(rows[i]))
        }
        process.exit(0)
    }
    else {
        console.log('db error searchByMovieId')
        process.exit(-22)
    }
});
