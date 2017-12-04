var request = require('request');
var uniquid = require('uniquid');

var adapter = {};

adapter.runEngine = function (planMovieId, actor1Id, actor2Id, cb) {

    var uid = uniquid();
    console.log(uid);
    request('http://localhost:10001/?uid='+uid+'&planMovieId='+planMovieId+'&actor1Id='+actor1Id+'&actor2Id='+actor2Id, function(err, response, body) {
        var data = JSON.parse(body);
        console.log(data)
        if (data.err) {
            console.log(err);
            cb(data.err, []);
        }
        else {
            cb(data.err, [parseInt(data.result.regression), parseInt(data.result.naive)]);
        }
    }); 
};

module.exports = adapter;
