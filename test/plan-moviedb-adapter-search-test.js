var hi = require('../adapters/plan-moviedb-adapter');
//var PlanMovie = require('../models/plan-movie');
//var planMovie = new PlanMovie(1,'title','original','originalVisible','budget',1,0,9,'genre','contentRate','directorId','makerId');

hi.search(3, null, function(resultCode,rows) {

    for(i in rows) {
        console.log(JSON.stringify(rows[i]));
    }
});