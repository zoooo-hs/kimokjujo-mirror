var engineMovieActorAdapter = require('../adapters/engine-movie-actordb-adapter');
const engineMovieActor = require('../models/engine-movie-actor');
const dbResultCode = require('../status-codes/db-result');

engineMovieActorAdapter.write(new engineMovieActor('movie_1234', 'heejin'), function(resultCode){
    if (resultCode == dbResultCode.OK) {
        console.log('write success');
        process.exit(0)
    }
    else {
        console.log('db error searchByMovieId');
        process.exit(-22)
    }
});
