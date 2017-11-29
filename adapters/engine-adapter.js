var engine//= require('') ;

var adapter = {};

adapter.runEngine = function (planMovieId, actor1Id, actor2Id, next) {

    var data = {
        planMovieId :planMovieId,
        actor1Id : actor1Id,
        actor2Id : actor2Id
    };

    /*engine.~~(data,function(err{
        if(err){
            console.log(err);
            next();
        }
        else{
            console.log('complete');
        }
    });
*/

};

module.exports = adapter;
