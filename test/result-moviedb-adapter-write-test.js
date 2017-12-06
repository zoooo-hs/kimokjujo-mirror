var result = require('../adapters/result-moviedb-adapter');
const ResultMovie = require('../models/result-movie');
const dbResultCode = require('../status-codes/db-result');
var resultMovie = new ResultMovie(1, 3, '2017-11-25', 'hiehe', 1045345, 1, 'heeeee123');

result.write(resultMovie, function(resultCode){
    if (resultCode == dbResultCode.OK) {
        console.log('write success');
        process.exit(0)
    }
    else {
        console.log('write fail');
        process.exit(-22)
    }
});
