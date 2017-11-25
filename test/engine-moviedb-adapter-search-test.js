var engineMovieAdapter = require('../adapters/engine-moviedb-adapter');
// var EngineMovie = require('../models/engine-movie');
// var engineMovie = new EngineMovie(11, 'title', 'original', 'originalVisible', 'budget', 1, 0, 9, 'genre', 'contentRate', 100000, 'directorId', 'makerId');

engineMovieAdapter.search('movie_1',function(resultCode, rows) {
    console.log("result:"+resultCode + JSON.stringify(rows[0]));
    console.log('min_kinggod ^^7');
});