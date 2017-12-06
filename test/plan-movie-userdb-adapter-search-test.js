var planMovieUserAdapter = require('../adapters/plan-movie-userdb-adapter');
const dbResultCode = require('../status-codes/db-result');

planMovieUserAdapter.searchByUserId('heeeee1123', [], function(resultCode, rows){
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
