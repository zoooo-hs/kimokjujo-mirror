var engineMovieAdapter = require('../adapters/engine-moviedb-adapter');
var EngineMovie = require('../models/engine-movie');
var engineMovie = new EngineMovie(11, 'title', 'original', 'originalVisible', 100000, 1, 0, '2111-12-12', 'genre', 'contentRate', 100000, 'directorId', 'makerId');

engineMovieAdapter.write(engineMovie, function(resultCode) {
    console.log("result:"+resultCode);
    console.log('min_kinggod ^^7');
});