var engineAdapter = require('../adapters/engine-adapter');

engineAdapter.runEngine(4, 'actor_4', 'actor_45', function(err, result) {
    if (err) {
        console.error(err);
    }
    else {
        console.log(result);
    }
});