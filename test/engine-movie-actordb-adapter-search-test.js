var engineMovieActorAdapter = require('../adapters/engine-movie-actordb-adapter');
const engineMovieActor = require('../models/engine-movie-actor');
const dbResultCode = require('../status-codes/db-result');

engineMovieActorAdapter.searchByMovieId('movie_472',[],function(resultCode, rows){
    if(resultCode==dbResultCode.OK){
        for (var i in rows) {
            console.log('Count (i) : ' + JSON.stringify(rows[i]));
        }
        process.exit(0)
    }
    else {
        console.log('db error searchByMovieId');
        process.exit(-22)
    }
});