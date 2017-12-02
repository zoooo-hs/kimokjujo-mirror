var adapter = {};

adapter.runEngine = function (planMovieId, actor1Id, actor2Id, cb) {

    var regression = 10000;
    var naive = 0;

    var err = 0;

    cb(err, [regression, naive]);
};

module.exports = adapter;
