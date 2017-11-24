var planMovieActorAdapter = require('../adapters/plan-movie-actordb-adapter');
const PlanMovieActor = require('../models/plan-movie-actor');
const dbResultCode = require('../status-codes/db-result');

planMovieActorAdapter.write(new PlanMovieActor(null, 'hell', 'house'), function(resultCode){
    if (resultCode == dbResultCode.OK) {
        console.log('write success');
        process.exit(0)
    }
    else {
        console.log('db error searchByMovieId');
        process.exit(-22)
    }
});
