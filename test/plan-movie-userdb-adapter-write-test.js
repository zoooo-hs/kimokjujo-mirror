var planMovieUserAdapter = require('../adapters/plan-movie-userdb-adapter');
const PlanMovieUser = require('../models/plan-movie-user');
const dbResultCode = require('../status-codes/db-result');
var planmovieuser = new PlanMovieUser(1,3,'heeeee123');

planMovieUserAdapter.write(planmovieuser, function(resultCode){
    if (resultCode == dbResultCode.OK) {
        console.log('write success');
        process.exit(0)
    }
    else {
        console.log('db error searchByMovieId');
        process.exit(-22)
    }
});
